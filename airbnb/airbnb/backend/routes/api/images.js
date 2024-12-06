const express = require('express');
const { Image, Spot } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

// Upload a new image for a spot
router.post('/:spotId', requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    res.status(404).json({ message: 'Spot not found' });
    return;
  }

  if (spot.ownerId !== req.user.id) {
    res.status(403).json({ message: 'Unauthorized' });
    return;
  }

  const { url } = req.body;

  const newImage = await Image.create({
    spotId: spot.id,
    url,
  });

  res.status(201).json(newImage);
});

// Delete an image
router.delete('/:id', requireAuth, async (req, res) => {
  const image = await Image.findByPk(req.params.id);

  if (!image) {
    res.status(404).json({ message: 'Image not found' });
    return;
  }

  const spot = await Spot.findByPk(image.spotId);

  if (spot.ownerId !== req.user.id) {
    res.status(403).json({ message: 'Unauthorized' });
    return;
  }

  await image.destroy();
  res.json({ message: 'Image deleted successfully' });
});

module.exports = router;