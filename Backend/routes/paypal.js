// routes/paypal.js
const express = require('express');
const paypal = require('@paypal/checkout-server-sdk');
const router = express.Router();

const environment = new paypal.core.SandboxEnvironment('yourClientId', 'yourClientSecret');
const client = new paypal.core.PayPalHttpClient(environment);

router.post('/create-order', async (req, res) => {
  const request = new paypal.orders.OrdersCreateRequest();
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value: '10.00', // Replace with the actual amount
        },
      },
    ],
  });

  try {
    const order = await client.execute(request);
    res.json({ id: order.result.id });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.post('/capture-order', async (req, res) => {
  const { orderID } = req.body;
  const request = new paypal.orders.OrdersCaptureRequest(orderID);

  try {
    const capture = await client.execute(request);
    res.json(capture.result);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;