import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import { uploadImage, listImages } from '../controllers/galleryController.js';

const router = express.Router();

router.get('/', listImages);
router.post('/', protect, authorize('admin'), uploadImage);

export default router;
