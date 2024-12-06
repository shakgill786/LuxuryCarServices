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

// Use routes
app.use(routes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve('../frontend/dist')));
  app.get(/^(?!\/api).*/, (req, res) =>
    res.sendFile(path.resolve('../frontend/dist', 'index.html'))
  );
}

module.exports = app;