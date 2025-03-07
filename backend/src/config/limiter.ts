import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  handler: (req, res) => {
    res.status(429).json({
      message: 'Too many requests from your IP, please try again later',
    });
  },
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});

export default limiter;
