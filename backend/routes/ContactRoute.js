const express = require('express');
const router = express.Router();
const contactController = require('../controllers/ContactController');

// POST /api/contact
router.post('/contact', contactController.submitContactForm);

module.exports = router;
