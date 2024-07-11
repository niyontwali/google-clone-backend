const express = require('express');

const searchRoutes = require('./searches');

// router instance
const router = express.Router();

router.use('/search', searchRoutes);

module.exports = router;
