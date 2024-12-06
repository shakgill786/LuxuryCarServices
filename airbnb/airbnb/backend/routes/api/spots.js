const express = require('express');
const { Spot, Review, Image, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

// Get all spots
router.get('/', async (req, res) => {
  const spots = await Spot.findAll({
    include: { model: Image, attributes: ['url'] },
  });
  return res.json({ spots });
});

// Get details of a spot by ID
router.get('/:spotId', async (req, res) => {
  const { spotId } = req.params;
  const spot = await Spot.findByPk(spotId, {
    include: [
      { model: Image, attributes: ['url'] },
      { model: Review },
    ],
  });
  if (!spot) return res.status(404).json({ error: 'Spot not found' });
  return res.json({ spot });
});

// Create a new spot
router.post('/', requireAuth, async (req, res) => {
  const { address, city, state, country, name, description, price } = req.body;
  const spot = await Spot.create({
    ownerId: req.user.id,
    address,
    city,
    state,
    country,
    name,
    description,
    price,
  });
  return res.status(201).json({ spot });
});

// Update a spot
router.put('/:spotId', requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const { address, city, state, country, name, description, price } = req.body;

  const spot = await Spot.findByPk(spotId);
  if (!spot) return res.status(404).json({ error: 'Spot not found' });

  if (spot.ownerId !== req.user.id) {
    return res.status(403).json({ error: 'Not authorized' });
  }

  await spot.update({ address, city, state, country, name, description, price });
  return res.json({ spot });
});

// Delete a spot
router.delete('/:spotId', requireAuth, async (req, res) => {
  const { spotId } = req.params;

  const spot = await Spot.findByPk(spotId);
  if (!spot) return res.status(404).json({ error: 'Spot not found' });

  if (spot.ownerId !== req.user.id) {
    return res.status(403).json({ error: 'Not authorized' });
  }

  await spot.destroy();
  return res.status(204).end();
});

module.exports = router;