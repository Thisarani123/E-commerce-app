// routes/orders.js
const express = require('express');
const { body } = require('express-validator');
const { createOrder, getUserOrders, getOrder, cancelOrder } = require('../controllers/orderController');
const { auth } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(auth);

const orderValidation = [
  body('shippingAddress.street').notEmpty().withMessage('Street address is required'),
  body('shippingAddress.city').notEmpty().withMessage('City is required'),
  body('shippingAddress.state').notEmpty().withMessage('State is required'),
  body('shippingAddress.zipCode').notEmpty().withMessage('ZIP code is required'),
  body('paymentMethod').isIn(['card', 'paypal', 'bank_transfer', 'cod']).withMessage('Valid payment method is required')
];

router.post('/', orderValidation, createOrder);
router.get('/', getUserOrders);
router.get('/:id', getOrder);
router.put('/:id/cancel', cancelOrder);

module.exports = router;