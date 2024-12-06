const express = require('express');
const { Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

// Get bookings for a user
router.get('/', requireAuth, async (req, res) => {
  const bookings = await Booking.findAll({ where: { userId: req.user.id } });
  res.json(bookings);
});

module.exports = router;