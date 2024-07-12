const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { paypalClient, paypalEnv } = require('../config/paypal');
const { mpesaClient } = require('../config/mpesa');
const Order = require('../models/Order');

exports.createStripePaymentIntent = async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.createPaypalOrder = async (req, res) => {
  const { amount } = req.body;

  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{ amount: { currency_code: 'USD', value: amount } }],
  });

  try {
    const order = await paypalClient.execute(request);
    res.json({ id: order.result.id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.createMpesaPayment = async (req, res) => {
  const { amount, phone } = req.body;

  try {
    const response = await mpesaClient.lipaNaMpesaOnline({
      BusinessShortCode: process.env.MPESA_SHORTCODE,
      Amount: amount,
      PartyA: phone,
      PartyB: process.env.MPESA_SHORTCODE,
      PhoneNumber: phone,
      CallBackURL: process.env.MPESA_CALLBACK_URL,
      AccountReference: 'GiftGenius',
      TransactionDesc: 'Gift purchase',
    });

    res.json(response);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};