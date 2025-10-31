// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// ✅ Existing routes
router.get('/category', categoryController.showCategoryPage);
router.get('/categories', categoryController.getCategories);
router.get("/category/active", categoryController.getActiveCategories);


// ✅ New CRUD routes
// router.get('/api/category', categoryController.getAllCategories);     // Get all categories
router.post('/category/add', categoryController.addCategory);         // Add new category
router.put('/category/:id', categoryController.updateCategory);   // Update category
router.delete('/category/:id', categoryController.deleteCategory);// Delete category

module.exports = router;
