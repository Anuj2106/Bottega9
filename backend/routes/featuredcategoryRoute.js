const express = require('express');
const router = express.Router();
const featuredController = require('../controllers/featurecategoryController');
const uploadFeaturedCategory = require('../middleware/featurecategory'); // Multer config

// Add
router.post('/add', uploadFeaturedCategory.single('image'), featuredController.addFeaturedCategory);

// Update
router.put('/:id', uploadFeaturedCategory.single('image'), featuredController.updateFeaturedCategory);

// Delete
router.delete('/:id', featuredController.deleteFeaturedCategory);

// Get All
router.get('/index', featuredController.getAllFeaturedCategories);

module.exports = router;
