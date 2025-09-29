exports.getProducts = (req, res) => res.json({ success: true, products: [] });
exports.getProduct = (req, res) => res.json({ success: true, product: null });
exports.getProductsByCategory = (req, res) => res.json({ success: true, products: [] });
exports.searchProducts = (req, res) => res.json({ success: true, products: [] });
exports.getRelatedProducts = (req, res) => res.json({ success: true, products: [] });
exports.getFeaturedProducts = (req, res) => res.json({ success: true, products: [] });