import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';

export const protect = asyncHandler(async (req, res, next) => {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.split(' ')[1] : null;

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
        res.status(401);
        throw new Error('Session expired, please log in again');
    }

    const user = await User.findById(decoded.id);
    if (!user || !user.isActive) {
        res.status(401);
        throw new Error('Account not found or deactivated');
    }

    req.user = user;
    next();
});

export const authorize = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        res.status(403);
        throw new Error('You do not have permission to perform this action');
    }
    next();
};