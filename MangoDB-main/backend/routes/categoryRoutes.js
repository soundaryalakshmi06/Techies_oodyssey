import { Router } from 'express';
import { getCategories, createCategory, updateCategory } from '../controllers/categoryController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

router.get('/', getCategories);
router.post('/', protect, authorize('admin'), createCategory);
router.patch('/:id', protect, authorize('admin'), updateCategory);

export default router;