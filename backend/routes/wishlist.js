// routes/wishlist.js
const express = require('express');
const { getWishlist, addToWishlist, removeFromWishlist } = require('../controllers/wishlistController');
const { auth } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(auth);

router.get('/', getWishlist);
router.post('/items', addToWishlist);
router.delete('/items/:productId', removeFromWishlist);

module.exports = router;