const express = require('express');
const router = express.Router();
const lookbookUpload = require('../middleware/lookbookUpload');
const lookbookController = require('../controllers/lookBookController');

// Upload Lookbook PDF
router.get('/all', lookbookController.getLookbooks);
router.post('/upload', lookbookUpload, lookbookController.uploadLookbook);
router.delete('/delete/:id', lookbookController.deleteLookbook); // Assuming you have a delete function

module.exports = router;
