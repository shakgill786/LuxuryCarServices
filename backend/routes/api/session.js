const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../../backend/db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// **Login Validation Middleware**
const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors,
];

// **Log In a User**
router.post('/', validateLogin, async (req, res, next) => {
  const { credential, password } = req.body;

  if (!credential || !password) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid request',
      errors: {
        credential: !credential ? 'Email or username is required' : undefined,
        password: !password ? 'Password is required' : undefined,
      },
    });
  }

  try {
    const user = await User.unscoped().findOne({
      where: {
        [Op.or]: [{ username: credential }, { email: credential }],
      },
    });

    if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials',
      });
    }

    const safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    await setTokenCookie(res, safeUser);

    return res.json({
      status: 'success',
      message: 'User logged in successfully',
      data: { user: safeUser },
    });
  } catch (err) {
    next(err);
  }
});

// **Log Out a User**
router.delete('/', (_req, res) => {
  res.clearCookie('token');
  return res.json({
    status: 'success',
    message: 'Successfully logged out',
  });
});

// **Restore Session User**
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
    return res.json({
      status: 'success',
      message: 'Session restored',
      data: { user: safeUser },
    });
  } else {
    return res.json({
      status: 'success',
      message: 'No session found',
      data: null,
    });
  }
});

module.exports = router;