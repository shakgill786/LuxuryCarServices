const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();

// Log in
router.post('/', async (req, res, next) => {
  const { credential, password } = req.body;
  const user = await User.login({ credential, password });

  if (!user) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  setTokenCookie(res, user);
  res.json({ user });
});

// Log out
router.delete('/', (_req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Success' });
});

// Restore session user
router.get('/', requireAuth, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;