import mongoose from 'mongoose';
import Category from '../models/Category.js';
import asyncHandler from '../utils/asyncHandler.js';

// GET /api/categories  (public; ?all=true includes inactive)
export const getCategories = asyncHandler(async (req, res) => {
    const filter = req.query.all === 'true' ? {} : { active: true };
    const categories = await Category.find(filter).sort({ name: 1 }).lean();
    res.json(categories);
});

// POST /api/categories  (admin)
export const createCategory = asyncHandler(async (req, res) => {
    const { name, description, icon, services } = req.body;
    if (!name) {
        res.status(400);
        throw new Error('Category name is required');
    }
    const category = await Category.create({ name, description, icon, services });
    res.status(201).json(category);
});

// PATCH /api/categories/:id  (admin)
export const updateCategory = asyncHandler(async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400);
        throw new Error('Invalid category id');
    }
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!category) {
        res.status(404);
        throw new Error('Category not found');
    }
    res.json(category);
});