const express = require('express');
const { Review, User, Spot } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

// Get all reviews for a spot
router.get('/spots/:spotId', async (req, res) => {
  const { spotId } = req.params;
  const reviews = await Review.findAll({
    where: { spotId },
    include: { model: User, attributes: ['username'] },
  });
  return res.json({ reviews });
});

// Create a review for a spot
router.post('/spots/:spotId', requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const { review, stars } = req.body;

  const newReview = await Review.create({
    userId: req.user.id,
    spotId,
    review,
    stars,
  });
  return res.status(201).json({ newReview });
});

// Update a review
router.put('/:reviewId', requireAuth, async (req, res) => {
  const { reviewId } = req.params;
  const { review, stars } = req.body;

  const existingReview = await Review.findByPk(reviewId);
  if (!existingReview) return res.status(404).json({ error: 'Review not found' });

  if (existingReview.userId !== req.user.id) {
    return res.status(403).json({ error: 'Not authorized' });
  }

  await existingReview.update({ review, stars });
  return res.json({ existingReview });
});

// Delete a review
router.delete('/:reviewId', requireAuth, async (req, res) => {
  const { reviewId } = req.params;

  const review = await Review.findByPk(reviewId);
  if (!review) return res.status(404).json({ error: 'Review not found' });

  if (review.userId !== req.user.id) {
    return res.status(403).json({ error: 'Not authorized' });
  }

  await review.destroy();
  return res.status(204).end();
});

module.exports = router;