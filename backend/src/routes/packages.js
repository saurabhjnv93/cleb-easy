import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import { listPackages, createPackage, updatePackage, deletePackage } from '../controllers/packageController.js';

const router = express.Router();

router.get('/', listPackages);
router.use(protect, authorize('admin'));
router.post('/', createPackage);
router.put('/:id', updatePackage);
router.delete('/:id', deletePackage);

export default router;
