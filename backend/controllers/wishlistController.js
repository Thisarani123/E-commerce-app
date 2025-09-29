exports.getWishlist = (req, res) => res.json({ success: true, wishlist: { items: [] } });
exports.addToWishlist = (req, res) => res.json({ success: true, message: 'Added to wishlist' });
exports.removeFromWishlist = (req, res) => res.json({ success: true, message: 'Removed' });