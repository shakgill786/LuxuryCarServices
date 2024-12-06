const express = require('express');
const { User } = require('../../db/models');
const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  const users = await User.findAll({
    attributes: ['id', 'username', 'email'],
  });
  res.json({ users });
});

module.exports = router;