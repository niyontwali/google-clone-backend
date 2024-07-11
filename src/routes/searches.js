const express = require('express');

const { search } = require('../controllers/searches');

const router = express.Router();

// Search route
router.get('/', search);

module.exports = router;
