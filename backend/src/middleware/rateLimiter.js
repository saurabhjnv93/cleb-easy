import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 1000 * 60,
  max: 100,
  message: { error: 'Too many requests, please try again later.' }
});

export default limiter;
