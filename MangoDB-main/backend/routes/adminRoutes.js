import { Router } from 'express';
import {
    getSummary,
    getAdminProviders,
    updateVerification,
    getAdminUsers,
    setUserActive,
} from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

router.use(protect, authorize('admin')); // every admin route is admin-only

router.get('/summary', getSummary);
router.get('/providers', getAdminProviders);
router.patch('/providers/:id/verification', updateVerification);
router.get('/users', getAdminUsers);
router.patch('/users/:id/active', setUserActive);

export default router;