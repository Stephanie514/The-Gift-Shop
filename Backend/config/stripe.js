// Backend/config/stripe.js

const stripe = require('stripe')('your-stripe-secret-key');

module.exports = stripe;