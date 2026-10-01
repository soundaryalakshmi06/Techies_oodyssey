import mongoose from 'mongoose';
import User from '../models/User.js';
import Provider from '../models/Provider.js';
import asyncHandler from '../utils/asyncHandler.js';

const escapeRegex = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// GET /api/admin/summary
export const getSummary = asyncHandler(async (req, res) => {
    const [totalUsers, totalCustomers, totalProviders, verifiedProviders, pendingVerifications] =
        await Promise.all([
            User.countDocuments(),
            User.countDocuments({ role: 'customer' }),
            Provider.countDocuments(),
            Provider.countDocuments({ verificationStatus: 'Approved' }),
            Provider.countDocuments({ verificationStatus: 'Pending' }),
        ]);

    res.json({
        totalUsers,
        totalCustomers,
        totalProviders,
        verifiedProviders,
        pendingVerifications,
        // Placeholders until the Booking model is added in the next step
        totalBookings: 0,
        activeBookings: 0,
        completedServices: 0,
        totalPlatformVolume: 0,
    });
});

// GET /api/admin/providers?verificationStatus=Pending&search=
export const getAdminProviders = asyncHandler(async (req, res) => {
    const filter = {};
    if (req.query.verificationStatus) filter.verificationStatus = req.query.verificationStatus;
    if (req.query.search) {
        const r = new RegExp(escapeRegex(req.query.search), 'i');
        filter.$or = [{ name: r }, { email: r }, { category: r }, { phone: r }];
    }
    const providers = await Provider.find(filter).sort({ createdAt: -1 }).lean();
    res.json(providers);
});

const STATUS_MAP = {
    approved: 'Approved',
    verified: 'Approved',
    rejected: 'Rejected',
    pending: 'Pending',
    moreinfo: 'MoreInfo',
    requestmoreinfo: 'MoreInfo',
};

// PATCH /api/admin/providers/:id/verification   body: { status, reason?, level? }
export const updateVerification = asyncHandler(async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400);
        throw new Error('Invalid provider id');
    }
    const status = STATUS_MAP[String(req.body.status || '').replace(/\s+/g, '').toLowerCase()];
    if (!status) {
        res.status(400);
        throw new Error('status must be Approved, Rejected, Pending or MoreInfo');
    }

    const provider = await Provider.findById(req.params.id);
    if (!provider) {
        res.status(404);
        throw new Error('Provider not found');
    }

    provider.verificationStatus = status;
    provider.verificationReason = req.body.reason || '';
    if (['basic', 'experience', 'certified'].includes(req.body.level)) {
        provider.verificationLevel = req.body.level;
    }
    await provider.save();

    res.json(provider);
});

// GET /api/admin/users?role=customer|provider|admin&search=
export const getAdminUsers = asyncHandler(async (req, res) => {
    const filter = {};
    if (req.query.role) filter.role = req.query.role;
    if (req.query.search) {
        const r = new RegExp(escapeRegex(req.query.search), 'i');
        filter.$or = [{ name: r }, { email: r }, { phone: r }];
    }
    const users = await User.find(filter).sort({ createdAt: -1 }).lean();
    res.json(users);
});

// PATCH /api/admin/users/:id/active   body: { isActive: boolean }
export const setUserActive = asyncHandler(async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400);
        throw new Error('Invalid user id');
    }
    if (req.params.id === req.user._id.toString()) {
        res.status(400);
        throw new Error('You cannot deactivate your own account');
    }
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }
    user.isActive = Boolean(req.body.isActive);
    await user.save();
    if (user.role === 'provider' && !user.isActive) {
        await Provider.findOneAndUpdate({ user: user._id }, { available: false });
    }
    res.json({ _id: user._id, isActive: user.isActive });
});