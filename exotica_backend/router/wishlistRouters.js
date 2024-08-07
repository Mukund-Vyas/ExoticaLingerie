const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');
const auth = require('../middleware/authMiddleware');

router.post('/wishlist', auth, wishlistController.addToWishlist);
router.delete('/wishlist/:productId/:variationId', auth, wishlistController.removeFromWishlist);
router.get('/wishlist', auth, wishlistController.getWishlist);
router.get('/wishlist/check/:productId/:variationId', auth, wishlistController.checkWishlistStatus);

module.exports = router;