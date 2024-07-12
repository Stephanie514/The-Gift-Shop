// routes/mpesa.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

const consumerKey = 'yourConsumerKey';
const consumerSecret = 'yourConsumerSecret';
const shortCode = 'yourShortCode';
const lipaNaMpesaOnlineShortcode = 'yourLipaNaMpesaOnlineShortcode';
const lipaNaMpesaOnlinePasskey = 'yourLipaNaMpesaOnlinePasskey';
const callbackURL = 'yourCallbackURL';

const getAccessToken = async () => {
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
  const response = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });
  return response.data.access_token;
};

router.post('/stkpush', async (req, res) => {
  const { phone, amount } = req.body;
  const token = await getAccessToken();

  const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
  const password = Buffer.from(`${lipaNaMpesaOnlineShortcode}${lipaNaMpesaOnlinePasskey}${timestamp}`).toString('base64');

  const data = {
    BusinessShortCode: lipaNaMpesaOnlineShortcode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: 'CustomerPayBillOnline',
    Amount: amount,
    PartyA: phone,
    PartyB: lipaNaMpesaOnlineShortcode,
    PhoneNumber: phone,
    CallBackURL: callbackURL,
    AccountReference: 'GiftGenius',
    TransactionDesc: 'Payment for gifts',
  };

  try {
    const response = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;