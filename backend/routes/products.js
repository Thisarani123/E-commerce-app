// routes/products.js
const express = require('express');
const {
  getProducts,
  getProduct,
  getProductsByCategory,
  searchProducts,
  getRelatedProducts,
  getFeaturedProducts
} = require('../controllers/productController');

const router = express.Router();

router.get('/', getProducts);
router.get('/search', searchProducts);
router.get('/featured', getFeaturedProducts);
router.get('/category/:categoryId', getProductsByCategory);
router.get('/:id', getProduct);
router.get('/:id/related', getRelatedProducts);

module.exports = router;