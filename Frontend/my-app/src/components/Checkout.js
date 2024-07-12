import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { createStripePaymentIntent, createPaypalOrder, createMpesaPayment } from '../services/paymentService';

const Checkout = () => {
  const { token } = useContext(AuthContext);
  const [amount, setAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('stripe');

  const handleCheckout = async () => {
    if (paymentMethod === 'stripe') {
      const { clientSecret } = await createStripePaymentIntent(token, amount);
      // Use clientSecret to confirm Stripe payment
      console.log('Stripe Client Secret:', clientSecret);
    } else if (paymentMethod === 'paypal') {
      const { id } = await createPaypalOrder(token, amount);
      // Redirect to PayPal to complete the payment
      console.log('PayPal Order ID:', id);
    } else if (paymentMethod === 'mpesa') {
      const phone = prompt('Enter your Mpesa phone number');
      await createMpesaPayment(token, amount, phone);
      // Handle Mpesa payment confirmation
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
      <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
        <option value="stripe">Stripe</option>
        <option value="paypal">PayPal</option>
        <option value="mpesa">Mpesa</option>
      </select>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default Checkout;