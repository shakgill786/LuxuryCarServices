const { check } = require('express-validator');
const { handleValidationErrors } = require('./validation');

const validateSpot = [
  check('address').notEmpty().withMessage('Street address is required'),
  check('city').notEmpty().withMessage('City is required'),
  check('state').notEmpty().withMessage('State is required'),
  check('country').notEmpty().withMessage('Country is required'),
  check('lat').isFloat({ min: -90, max: 90 }).withMessage('Latitude is invalid'),
  check('lng').isFloat({ min: -180, max: 180 }).withMessage('Longitude is invalid'),
  handleValidationErrors,
];

module.exports = { validateSpot };