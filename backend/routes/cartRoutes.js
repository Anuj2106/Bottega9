const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/add', cartController.addToCart);
router.get('/:user_id', cartController.getCartByUser);
router.put('/update', cartController.updateQuantity);
router.delete('/remove/:user_id/:prod_id', cartController.removeFromCart);
router.delete('/clear/:user_id', cartController.clearCart); // ✅ add this route


module.exports = router;
