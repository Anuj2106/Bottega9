// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/orders', orderController.getAllOrders);
router.get('/order-item',orderController.OrderItem);
router.put('/orders/:order_id/status', orderController.updateOrderStatus);

module.exports = router;
