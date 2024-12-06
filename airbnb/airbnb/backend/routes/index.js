const express = require('express');
const path = require('path');
const apiRouter = require('./api');
const router = express.Router();

// Use the API routes
router.use('/api', apiRouter);

// Serve React build files in production
if (process.env.NODE_ENV === 'production') {
  // Serve the frontend's index.html file at the root route
  router.get('/', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.sendFile(path.resolve(__dirname, '../../frontend', 'dist', 'index.html'));
  });

  // Serve static assets in the frontend's build folder
  router.use(express.static(path.resolve('../frontend/dist')));

  // Serve the frontend's index.html file at all other routes NOT starting with /api
  router.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.sendFile(path.resolve(__dirname, '../../frontend', 'dist', 'index.html'));
  });
}

// Add XSRF-TOKEN cookie in development
if (process.env.NODE_ENV !== 'production') {
  router.get('/api/csrf/restore', (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie('XSRF-TOKEN', csrfToken);
    res.status(200).json({ 'XSRF-Token': csrfToken });
  });
}

module.exports = router;