import Review from '../models/Review.js';

export const addReview = async (req, res, next) => {
  try {
    const review = await Review.create({ ...req.body, user: req.user._id, verified: false });
    res.status(201).json({ review });
  } catch (error) {
    next(error);
  }
};

export const listReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find().populate('user', 'name').sort({ createdAt: -1 });
    res.json({ reviews });
  } catch (error) {
    next(error);
  }
};
