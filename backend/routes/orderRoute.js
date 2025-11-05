const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// ✅ User Routes
router.post('/place', orderController.placeOrder);
router.get('/user/:user_id', orderController.getUserOrders);
router.get('/details/:order_id/:user_id', orderController.getOrderDetails);

// ✅ Admin Routes
router.get('/admin/all', orderController.getAllOrders);
router.get('/admin/details/:order_id', orderController.getOrderDetailsAdmin);
router.put('/admin/update-status/:order_id', orderController.updateOrderStatus);

module.exports = router;
