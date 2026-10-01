import mongoose from 'mongoose';
import User from '../models/User.js';
import Provider from '../models/Provider.js';
import Category from '../models/Category.js';
import asyncHandler from '../utils/asyncHandler.js';
import { signToken } from '../utils/token.js';
import { toGeoPoint } from '../utils/geo.js';
import { buildUserPayload } from '../utils/userPayload.js';

// The frontend may send a category _id or a category name
const resolveCategoryName = async (value) => {
    if (!value) return undefined;
    if (mongoose.isValidObjectId(value)) {
        const cat = await Category.findById(value);
        if (cat) return cat.name;
    }
    return String(value).trim();
};

const toArray = (value) => {
    if (Array.isArray(value)) return value.map((v) => String(v).trim()).filter(Boolean);
    if (typeof value === 'string') return value.split(',').map((v) => v.trim()).filter(Boolean);
    return [];
};

// POST /api/auth/register
export const register = asyncHandler(async (req, res) => {
    const { name, email, phone, password, preferredLanguage, city } = req.body;
    const role = req.body.role || 'customer';

    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Name, email and password are required');
    }
    if (String(password).length < 6) {
        res.status(400);
        throw new Error('Password must be at least 6 characters');
    }
    if (!['customer', 'provider'].includes(role)) {
        res.status(400);
        throw new Error('Invalid role'); // admins can never self-register
    }

    const cleanPhone = phone ? String(phone).trim() : undefined;
    const existing = await User.findOne({
        $or: [{ email: String(email).toLowerCase().trim() }, ...(cleanPhone ? [{ phone: cleanPhone }] : [])],
    });
    if (existing) {
        res.status(409);
        throw new Error('An account with this email or phone already exists');
    }

    let categoryName;
    if (role === 'provider') {
        categoryName = await resolveCategoryName(req.body.category);
        if (!categoryName) {
            res.status(400);
            throw new Error('Primary service category is required for providers');
        }
    }

    const user = await User.create({
        name,
        email,
        phone: cleanPhone,
        password,
        role,
        preferredLanguage: preferredLanguage || req.body.languages?.[0] || 'Tamil',
        city: city || 'Chennai',
    });

    if (role === 'provider') {
        try {
            await Provider.create({
                user: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                category: categoryName,
                services: toArray(req.body.services ?? req.body.servicesText),
                experienceYears: Number(req.body.experienceYears) || 0,
                priceFrom: Number(req.body.priceFrom) || 0,
                languages: toArray(req.body.languages).length ? toArray(req.body.languages) : ['Tamil'],
                address: req.body.address,
                location: toGeoPoint(req.body.location),
                verificationStatus: 'Pending',
            });
        } catch (err) {
            await User.findByIdAndDelete(user._id); // don't leave an orphan user
            throw err;
        }
    }

    res.status(201).json({ token: signToken(user._id), user: await buildUserPayload(user) });
});

// POST /api/auth/login   body: { email, password }  (email field may also hold a phone number)
export const login = asyncHandler(async (req, res) => {
    const identifier = String(req.body.email || req.body.identifier || req.body.phone || '').trim();
    const { password } = req.body;

    if (!identifier || !password) {
        res.status(400);
        throw new Error('Email/mobile and password are required');
    }

    const query = identifier.includes('@') ? { email: identifier.toLowerCase() } : { phone: identifier };
    const user = await User.findOne(query).select('+password');

    // 400 (not 401) so a wrong password never triggers the frontend's auto-logout redirect
    if (!user || !(await user.matchPassword(password))) {
        res.status(400);
        throw new Error('Invalid email/mobile or password');
    }
    if (!user.isActive) {
        res.status(403);
        throw new Error('Your account has been deactivated. Please contact support.');
    }

    res.json({ token: signToken(user._id), user: await buildUserPayload(user) });
});

// GET /api/auth/me
export const getMe = asyncHandler(async (req, res) => {
    res.json({ user: await buildUserPayload(req.user) });
});

// PATCH /api/auth/profile
export const updateProfile = asyncHandler(async (req, res) => {
    const { name, phone, preferredLanguage, city } = req.body;
    const user = req.user;

    if (name) user.name = name;
    if (phone) user.phone = String(phone).trim();
    if (preferredLanguage) user.preferredLanguage = preferredLanguage;
    if (city) user.city = city;
    await user.save();

    if (user.role === 'provider') {
        await Provider.findOneAndUpdate({ user: user._id }, { name: user.name, phone: user.phone });
    }

    res.json({ user: await buildUserPayload(user) });
});