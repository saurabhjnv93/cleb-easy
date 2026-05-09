import User from '../models/User.js';
import Booking from '../models/Booking.js';
import Package from '../models/Package.js';

export const getAdminOverview = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const revenue = await Booking.aggregate([
      { $match: { paid: true } },
      { $group: { _id: null, total: { $sum: '$price' } } }
    ]);
    const recentBookings = await Booking.find().sort({ createdAt: -1 }).limit(8).populate('user packageId');
    res.json({ totalUsers, totalBookings, revenue: revenue[0]?.total || 0, recentBookings });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.json({ users });
  } catch (error) {
    next(error);
  }
};

export const manageUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user });
  } catch (error) {
    next(error);
  }
};
