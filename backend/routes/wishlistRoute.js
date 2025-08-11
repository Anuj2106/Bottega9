const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');

router.post('/toggle', wishlistController.toggleWishlist);
router.get('/:user_id', wishlistController.getWishlist);
router.delete('/:user_id/:prod_id', wishlistController.removeFromWishlist);

module.exports = router;
