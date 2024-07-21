const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Initialize Stripe with your secret key
const paypal = require('paypal-rest-sdk'); // Initialize PayPal
const axios = require('axios');
const authMiddleware = require('../middleware/authMiddleware');
const { calculateTotalAmount } = require('../utils/calculateTotalAmount'); // Assuming this is a utility function

// Configure PayPal
paypal.configure({
  mode: 'sandbox', // Change to 'live' for production
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

// Checkout route with authentication middleware
router.post('/checkout', authMiddleware, async (req, res) => {
  try {
    // Handle general checkout logic
    res.status(200).json({ message: 'Checkout route' });
  } catch (err) {
    res.status(500).json({ message: 'Error processing checkout' });
  }
});

// Checkout route
router.post('/stripe', async (req, res) => {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: req.body.cartItems.map(item => ({
          price_data: {
            currency: 'usd',
            product_data: { name: item.product.name },
            unit_amount: item.product.price * 100,
          },
          quantity: item.quantity,
        })),
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/success`,
        cancel_url: `${process.env.CLIENT_URL}/cancel`,
      });
      res.json({ url: session.url });
    } catch (err) {
      res.status(500).json({ message: 'Error creating Stripe checkout session' });
    }
  });
  
router.post('/paypal', async (req, res) => {
    try {
      const create_payment_json = {
        intent: 'sale',
        payer: { payment_method: 'paypal' },
        redirect_urls: {
          return_url: `${process.env.CLIENT_URL}/success`,
          cancel_url: `${process.env.CLIENT_URL}/cancel`,
        },
        transactions: [{
          item_list: { items: req.body.cartItems },
          amount: { currency: 'USD', total: calculateTotalAmount(req.body.cartItems) },
          description: 'This is the payment description.',
        }],
      };
  
      paypal.payment.create(create_payment_json, (error, payment) => {
        if (error) {
          res.status(500).json({ message: 'Error creating PayPal payment' });
        } else {
          res.json({ approval_url: payment.links.find(link => link.rel === 'approval_url').href });
        }
      });
    } catch (err) {
      res.status(500).json({ message: 'Error creating PayPal payment' });
    }
  });

router.post('/mpesa', async (req, res) => {
    try {
      // Example for initializing Mpesa payment request
      const response = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
        // Mpesa payment request parameters
      }, {
        headers: { 'Authorization': `Bearer ${process.env.MPESA_ACCESS_TOKEN}` },
      });
      res.json({ redirect_url: response.data.checkoutRequestID });
    } catch (err) {
      res.status(500).json({ message: 'Error creating Mpesa payment' });
    }
  });

module.exports = router;