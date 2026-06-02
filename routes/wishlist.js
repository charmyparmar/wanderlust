const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlist');
const { isLoggedIn } = require('../middleware');
const wrapAsync = require('../utils/wrapAsync');

// Render Wishlist Page
router.get('/', isLoggedIn, wrapAsync(wishlistController.renderWishlist));

// Toggle Wishlist Status
router.post('/toggle/:id', wrapAsync(wishlistController.toggleWishlist));

module.exports = router;
