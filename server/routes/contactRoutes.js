
const express = require('express');
const { handleContactForm } = require('../controllers/contactController');

const router = express.Router();

// POST /api/contact - Handle contact form submissions
router.post('/contact', handleContactForm);

module.exports = router;
