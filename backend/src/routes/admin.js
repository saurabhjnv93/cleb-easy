import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import { getAdminOverview, getUsers, manageUser } from '../controllers/adminController.js';

const router = express.Router();
router.use(protect, authorize('admin'));

router.get('/overview', getAdminOverview);
router.get('/users', getUsers);
router.put('/users/:id', manageUser);

export default router;
