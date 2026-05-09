import express from 'express';
import { protect } from '../middleware/auth.js';
import { createBooking, getBookings, getBookingById, cancelBooking } from '../controllers/bookingController.js';

const router = express.Router();

router.use(protect);
router.post('/', createBooking);
router.get('/', getBookings);
router.get('/:id', getBookingById);
router.post('/:id/cancel', cancelBooking);

export default router;
