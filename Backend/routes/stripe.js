// routes/payment.js
const express = require('express');
const stripe = require('stripe')('yourStripeSecretKey');
const router = express.Router();

router.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;