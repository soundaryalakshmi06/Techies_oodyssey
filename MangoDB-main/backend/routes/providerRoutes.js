import { Router } from 'express';
import {
    getProviders,
    getNearbyProviders,
    getMyProvider,
    getProviderById,
    updateAvailability,
    updateLocation,
} from '../controllers/providerController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

router.get('/', getProviders);
router.get('/nearby', getNearbyProviders);
router.get('/me', protect, authorize('provider'), getMyProvider);
router.get('/:id', getProviderById);

router.patch('/:id/availability', protect, authorize('provider', 'admin'), updateAvailability);
router.patch('/:id/location', protect, authorize('provider', 'admin'), updateLocation);

export default router;