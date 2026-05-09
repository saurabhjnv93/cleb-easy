import express from 'express';
import { protect } from '../middleware/auth.js';
import { addReview, listReviews } from '../controllers/reviewController.js';

const router = express.Router();

router.get('/', listReviews);
router.post('/', protect, addReview);

export default router;
