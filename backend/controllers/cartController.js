exports.getCart = (req, res) => res.json({ success: true, cart: { items: [], total: 0 } });
exports.addToCart = (req, res) => res.json({ success: true, message: 'Added to cart' });
exports.updateCartItem = (req, res) => res.json({ success: true, message: 'Updated' });
exports.removeFromCart = (req, res) => res.json({ success: true, message: 'Removed' });
exports.clearCart = (req, res) => res.json({ success: true, message: 'Cleared' });