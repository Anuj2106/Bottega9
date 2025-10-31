const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemcontroller');

// Fetch all items for DataGrid
router.get('/index', itemController.showItemsPage);

// Add a new item
router.post('/add', itemController.addItem);

// Update item by ID
router.put('/:id', itemController.updateItem);

// Delete item by ID
router.delete('/:id', itemController.deleteItem);

// Optional: fetch active items
router.get('/active', itemController.getActiveItems);


module.exports = router;
