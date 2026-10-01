import mongoose from 'mongoose';
import Provider from '../models/Provider.js';
import asyncHandler from '../utils/asyncHandler.js';
import { toGeoPoint } from '../utils/geo.js';

const escapeRegex = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Never expose these on public endpoints
const PUBLIC_EXCLUDE = '-documents -email -phone -verificationReason -user';

const buildFilter = (q) => {
    const f = { verificationStatus: 'Approved' }; // public listings: approved only
    if (q.category) f.category = new RegExp(`^${escapeRegex(q.category)}$`, 'i');
    if (q.service) f.services = new RegExp(escapeRegex(q.service), 'i');
    if (q.language) f.languages = new RegExp(`^${escapeRegex(q.language)}$`, 'i');
    if (q.available === 'true') f.available = true;
    if (q.minRating) f.rating = { $gte: Number(q.minRating) };
    if (q.maxPrice) f.priceFrom = { $lte: Number(q.maxPrice) };
    if (q.city) f.address = new RegExp(escapeRegex(q.city), 'i');
    if (q.search) {
        const r = new RegExp(escapeRegex(q.search), 'i');
        f.$or = [{ name: r }, { category: r }, { services: r }, { address: r }];
    }
    return f;
};

const SORTS = {
    rating: { rating: -1, reviewCount: -1 },
    priceLow: { priceFrom: 1 },
    priceHigh: { priceFrom: -1 },
    experience: { experienceYears: -1 },
};

// GET /api/providers
export const getProviders = asyncHandler(async (req, res) => {
    const providers = await Provider.find(buildFilter(req.query))
        .select(PUBLIC_EXCLUDE)
        .sort(SORTS[req.query.sort] || SORTS.rating)
        .limit(100)
        .lean();
    res.json(providers);
});

// GET /api/providers/nearby?longitude=&latitude=&maxDistance=&category=&service=&language=
export const getNearbyProviders = asyncHandler(async (req, res) => {
    const lng = Number(req.query.longitude);
    const lat = Number(req.query.latitude);
    if (!Number.isFinite(lng) || !Number.isFinite(lat)) {
        res.status(400);
        throw new Error('longitude and latitude are required');
    }

    // maxDistance in metres; small values (<=100) are treated as kilometres
    const raw = Number(req.query.maxDistance) || 10000;
    const maxDistance = raw <= 100 ? raw * 1000 : raw;

    const providers = await Provider.aggregate([
        {
            $geoNear: {
                near: { type: 'Point', coordinates: [lng, lat] },
                distanceField: 'distanceMeters',
                maxDistance,
                spherical: true,
                query: buildFilter(req.query),
            },
        },
        { $addFields: { distanceKm: { $round: [{ $divide: ['$distanceMeters', 1000] }, 1] } } },
        { $project: { documents: 0, email: 0, phone: 0, verificationReason: 0, user: 0 } },
        { $limit: 50 },
    ]);

    res.json(providers);
});

// GET /api/providers/me  (provider's own full profile)
export const getMyProvider = asyncHandler(async (req, res) => {
    const provider = await Provider.findOne({ user: req.user._id }).lean();
    if (!provider) {
        res.status(404);
        throw new Error('Provider profile not found');
    }
    res.json(provider);
});

// GET /api/providers/:id  (public: approved only)
export const getProviderById = asyncHandler(async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400);
        throw new Error('Invalid provider id');
    }
    const provider = await Provider.findOne({ _id: req.params.id, verificationStatus: 'Approved' })
        .select(PUBLIC_EXCLUDE)
        .lean();
    if (!provider) {
        res.status(404);
        throw new Error('Provider not found');
    }
    res.json(provider);
});

// Resolves ':id' (or 'me') and checks ownership
const resolveOwnedProvider = async (req, res) => {
    const { id } = req.params;
    let provider;
    if (id === 'me') {
        provider = await Provider.findOne({ user: req.user._id });
    } else {
        if (!mongoose.isValidObjectId(id)) {
            res.status(400);
            throw new Error('Invalid provider id');
        }
        provider = await Provider.findById(id);
    }
    if (!provider) {
        res.status(404);
        throw new Error('Provider not found');
    }
    const isOwner = provider.user.toString() === req.user._id.toString();
    if (!isOwner && req.user.role !== 'admin') {
        res.status(403);
        throw new Error('You can only update your own profile');
    }
    return provider;
};

// PATCH /api/providers/:id/availability   body: { available: boolean }   (:id may be "me")
export const updateAvailability = asyncHandler(async (req, res) => {
    const provider = await resolveOwnedProvider(req, res);
    const { available } = req.body;
    if (typeof available !== 'boolean' && available !== 'true' && available !== 'false') {
        res.status(400);
        throw new Error('available must be true or false');
    }
    provider.available = available === true || available === 'true';
    await provider.save();
    res.json({ available: provider.available });
});

// PATCH /api/providers/:id/location   body: { longitude, latitude }   (:id may be "me")
export const updateLocation = asyncHandler(async (req, res) => {
    const provider = await resolveOwnedProvider(req, res);
    const point = toGeoPoint({ longitude: req.body.longitude, latitude: req.body.latitude });
    if (!point) {
        res.status(400);
        throw new Error('Valid longitude and latitude are required');
    }
    provider.location = point;
    await provider.save();
    res.json({ location: provider.location });
});