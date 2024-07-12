const express = require('express');
const router = express.Router();
const { createStripePaymentIntent, createPaypalOrder, createMpesaPayment } = require('../controllers/paymentController');
const auth = require('../middlewares/authMiddleware');

router.post('/stripe', auth, createStripePaymentIntent);
router.post('/paypal', auth, createPaypalOrder);
router.post('/mpesa', auth, createMpesaPayment);

module.exports = router;