import Booking from '../models/Booking.js';
import Package from '../models/Package.js';
import { io } from '../../server.js';

export const createBooking = async (req, res, next) => {
  try {
    const { eventType, date, time, guests, packageId, addons, requirements, city, price } = req.body;
    const bookingPackage = await Package.findById(packageId);
    if (!bookingPackage) return res.status(404).json({ error: 'Package not found' });

    const booking = await Booking.create({
      user: req.user._id,
      eventType,
      date,
      time,
      guests,
      packageId,
      addons,
      requirements,
      city,
      price,
      status: 'pending'
    });
    req.user.bookings.push(booking._id);
    await req.user.save();

    io.to(req.user._id.toString()).emit('booking:update', booking);
    res.status(201).json({ booking });
  } catch (error) {
    next(error);
  }
};

export const getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate('packageId');
    res.json({ bookings });
  } catch (error) {
    next(error);
  }
};

export const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('packageId');
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    res.json({ booking });
  } catch (error) {
    next(error);
  }
};

export const updateBookingStatus = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    booking.status = req.body.status;
    await booking.save();
    io.to(booking.user.toString()).emit('booking:update', booking);
    res.json({ booking });
  } catch (error) {
    next(error);
  }
};

export const cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    booking.status = 'cancelled';
    await booking.save();
    io.to(req.user._id.toString()).emit('booking:update', booking);
    res.json({ booking });
  } catch (error) {
    next(error);
  }
};
