const express = require('express');
const { Op } = require('sequelize');
const { Spot, SpotImage, Review, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Validation Middleware for Spot Data
const validateSpot = [
  check('address').notEmpty().withMessage('Street address is required'),
  check('city').notEmpty().withMessage('City is required'),
  check('state').notEmpty().withMessage('State is required'),
  check('country').notEmpty().withMessage('Country is required'),
  check('lat')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be a valid number between -90 and 90'),
  check('lng')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be a valid number between -180 and 180'),
  check('name')
    .isLength({ max: 50 })
    .withMessage('Name must be less than 50 characters'),
  check('description').notEmpty().withMessage('Description is required'),
  check('price').isFloat({ gt: 0 }).withMessage('Price must be greater than zero'),
  handleValidationErrors,
];

// **GET /api/spots - Get All Spots**
router.get('/', async (req, res) => {
  const { page = 1, size = 20 } = req.query;
  const limit = Math.min(size, 20);
  const offset = (page - 1) * limit;

  const spots = await Spot.findAll({
    limit,
    offset,
    include: [{ model: SpotImage, where: { preview: true }, required: false }],
  });

  res.json({
    status: 'success',
    message: 'Spots retrieved successfully',
    data: spots,
  });
});

// **GET /api/spots/:spotId - Get Spot Details by ID**
router.get('/:spotId', async (req, res) => {
  const { spotId } = req.params;

  const spot = await Spot.findByPk(spotId, {
    include: [
      { model: SpotImage, attributes: ['id', 'url', 'preview'] },
      { model: User, as: 'Owner', attributes: ['id', 'firstName', 'lastName'] },
    ],
  });

  if (!spot) {
    return res.status(404).json({
      status: 'error',
      message: "Spot couldn't be found",
    });
  }

  const numReviews = await Review.count({ where: { spotId } });
  const avgRating =
    (await Review.aggregate('stars', 'avg', { where: { spotId } })) || 0;

  const formattedSpot = {
    id: spot.id,
    ownerId: spot.ownerId,
    address: spot.address,
    city: spot.city,
    state: spot.state,
    country: spot.country,
    lat: spot.lat,
    lng: spot.lng,
    name: spot.name,
    description: spot.description,
    price: spot.price,
    createdAt: spot.createdAt,
    updatedAt: spot.updatedAt,
    numReviews,
    avgStarRating: parseFloat(avgRating.toFixed(2)),
    SpotImages: spot.SpotImages,
    Owner: spot.Owner,
  };

  res.json({
    status: 'success',
    message: 'Spot details retrieved successfully',
    data: formattedSpot,
  });
});

// **POST /api/spots - Create a Spot**
router.post('/', requireAuth, validateSpot, async (req, res) => {
  const { user } = req;
  const { address, city, state, country, lat, lng, name, description, price } = req.body;

  const newSpot = await Spot.create({
    ownerId: user.id,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });

  res.status(201).json({
    status: 'success',
    message: 'Spot created successfully',
    data: newSpot,
  });
});

// **PUT /api/spots/:spotId - Update a Spot**
router.put('/:spotId', requireAuth, validateSpot, async (req, res) => {
  const { spotId } = req.params;
  const { address, city, state, country, lat, lng, name, description, price } = req.body;

  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    return res.status(404).json({
      status: 'error',
      message: "Spot couldn't be found",
    });
  }

  if (spot.ownerId !== req.user.id) {
    return res.status(403).json({
      status: 'error',
      message: 'Forbidden',
    });
  }

  Object.assign(spot, { address, city, state, country, lat, lng, name, description, price });
  await spot.save();

  res.json({
    status: 'success',
    message: 'Spot updated successfully',
    data: spot,
  });
});

// **DELETE /api/spots/:spotId - Delete a Spot**
router.delete('/:spotId', requireAuth, async (req, res) => {
  const { spotId } = req.params;

  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    return res.status(404).json({
      status: 'error',
      message: "Spot couldn't be found",
    });
  }

  if (spot.ownerId !== req.user.id) {
    return res.status(403).json({
      status: 'error',
      message: 'Forbidden',
    });
  }

  await spot.destroy();
  res.json({
    status: 'success',
    message: 'Spot deleted successfully',
  });
});

// **POST /api/spots/:spotId/images - Add Image to a Spot**
router.post('/:spotId/images', requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const { url, preview } = req.body;

  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    return res.status(404).json({
      status: 'error',
      message: "Spot couldn't be found",
    });
  }

  if (spot.ownerId !== req.user.id) {
    return res.status(403).json({
      status: 'error',
      message: 'Forbidden',
    });
  }

  const newImage = await SpotImage.create({
    spotId,
    url,
    preview,
  });

  res.status(201).json({
    status: 'success',
    message: 'Image added successfully',
    data: {
      id: newImage.id,
      url: newImage.url,
      preview: newImage.preview,
    },
  });
});

module.exports = router;