const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const path = require('path'); // Required to resolve paths
const { restoreUser } = require('./utils/auth');
const { ValidationError } = require('sequelize');
const routes = require('./routes');
const { environment } = require('./config');

const isProduction = environment === 'production';

const app = express();

// Logging middleware
app.use(morgan('dev'));

// Middleware to parse cookies and JSON request bodies
app.use(cookieParser());
app.use(express.json());

// CORS (only in development mode)
if (!isProduction) app.use(cors());

// Helmet for secure HTTP headers
app.use(
  helmet.crossOriginResourcePolicy({
    policy: 'cross-origin',
  })
);

// CSRF protection
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction ? 'Lax' : 'Strict',
      httpOnly: true,
    },
  })
);

// Serve static files from the React frontend build directory
app.use(express.static(path.join(__dirname, 'build')));

// Middleware to restore the authenticated user
app.use(restoreUser);

// Route handling
app.use(routes);

// Serve the React frontend for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Catch unhandled requests and forward to error handler
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = 'Resource Not Found';
  err.errors = { message: "The requested resource couldn't be found." };
  err.status = 404;
  next(err);
});

// Handle Sequelize validation errors
app.use((err, _req, _res, next) => {
  if (err instanceof ValidationError) {
    err.errors = err.errors.reduce(
      (errors, error) => ({ ...errors, [error.path]: error.message }),
      {}
    );
    err.title = 'Validation Error';
  }
  next(err);
});

// General error handler
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});

module.exports = app;