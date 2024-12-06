const express = require('express');
const sessionRouter = require('./session');
const spotsRouter = require('./spots');
const reviewsRouter = require('./reviews');
const bookingsRouter = require('./bookings');
const imagesRouter = require('./images');
const usersRouter = require('./users');

const router = express.Router();

router.use('/session', sessionRouter);
router.use('/spots', spotsRouter);
router.use('/reviews', reviewsRouter);
router.use('/bookings', bookingsRouter);
router.use('/images', imagesRouter);
router.use('/users', usersRouter);

module.exports = router;