// backend/routes/api/session.js
const express = require('express');
const bcrypt = require('bcryptjs');
const { User } = require('../../db/models');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Email or username is required.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required.'),
  handleValidationErrors,
];

// **Log In a User**
router.post('/', validateLogin, async (req, res) => {
  const { credential, password } = req.body;

  const user = await User.unscoped().findOne({
    where: {
      [Op.or]: [{ username: credential }, { email: credential }],
    },
  });

  if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const safeUser = {
    id: user.id,
    email: user.email,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
  };

  await setTokenCookie(res, user);
  return res.json({ user: safeUser });
});

// **Get Current User**
router.get('/', restoreUser, (req, res) => {
  const { user } = req;

  if (user) {
    const safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    return res.status(200).json({ user: safeUser });
  } else {
    return res.status(200).json({ user: null });
  }
});

module.exports = router;
