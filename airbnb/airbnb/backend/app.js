const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const { csrfProtection } = require('./utils/csrf');
const routes = require('./routes');

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Apply CSRF Protection
app.use(csrfProtection);

// Use API routes
app.use('/api', routes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the frontend build folder
  app.use(express.static(path.resolve(__dirname, '../frontend/build')));

  // Serve the React app for all other GET requests (except API routes)
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
  });
}

// Catch-all route for non-existing routes
app.use((req, res, next) => {
  const error = new Error("The requested resource couldn't be found.");
  error.status = 404;
  next(error);
});

// Global error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

module.exports = app;