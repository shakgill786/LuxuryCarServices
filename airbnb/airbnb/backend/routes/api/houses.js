const express = require('express');
const { House } = require('../../db/models');
const router = express.Router();

// Fetch all houses
router.get('/', async (req, res) => {
  const houses = await House.findAll();
  res.json(houses);
});

// Fetch a single house by ID
router.get('/:id', async (req, res) => {
  const house = await House.findByPk(req.params.id);
  if (!house) {
    res.status(404).json({ message: 'House not found' });
    return;
  }
  res.json(house);
});

module.exports = router;