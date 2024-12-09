const express = require('express');
const { restoreUser } = require('../../utils/auth');
const sessionRouter = require('./session');
const usersRouter = require('./users');
const spotsRouter = require('./spots');
const reviewsRouter = require('./reviews');
const bookingsRouter = require('./bookings');
const reviewImagesRouter = require('./review-images');
const spotImagesRouter = require('./spot-images');

const router = express.Router();

// Middleware to populate `req.user`
router.use(restoreUser);

// Register resource-specific routers
router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/spots', spotsRouter);
router.use('/reviews', reviewsRouter);
router.use('/bookings', bookingsRouter);
router.use('/spot-images', spotImagesRouter);
router.use('/review-images', reviewImagesRouter);

// **Test Route: Set Token Cookie**
router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({ where: { username: 'Demo-lition' } });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  setTokenCookie(res, user);
  return res.json({ user });
});

// **Test Route: Restore User**
router.get('/restore-user', (req, res) => {
  return res.json(req.user || { user: null });
});

// **Test Route: Require Authentication**
router.get('/require-auth', requireAuth, (req, res) => {
  return res.json(req.user);
});

module.exports = router;