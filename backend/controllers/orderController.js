exports.createOrder = (req, res) => res.json({ success: true, order: {} });
exports.getUserOrders = (req, res) => res.json({ success: true, orders: [] });
exports.getOrder = (req, res) => res.json({ success: true, order: {} });
exports.cancelOrder = (req, res) => res.json({ success: true, message: 'Cancelled' });