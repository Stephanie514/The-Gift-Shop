const CartItem = require('../models/Cart');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const paypal = require('paypal-rest-sdk');
// Configure PayPal
paypal.configure({
  mode: 'sandbox', // or 'live'
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET
});

// Checkout process
exports.checkout = async (req, res) => {
  try {
    const userId = req.user.id;
    const cartItems = await CartItem.find({ user: userId }).populate('product');

    // Implement payment processing with Stripe, PayPal, and Mpesa
    // Example for Stripe:
    const totalAmount = calculateTotalAmount(cartItems);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: cartItems.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.product.name
          },
          unit_amount: item.product.price * 100
        },
        quantity: item.quantity
      })),
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    res.status(500).json({ message: 'Error during checkout' });
  }
};

function calculateTotalAmount(cartItems) {
  return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
}