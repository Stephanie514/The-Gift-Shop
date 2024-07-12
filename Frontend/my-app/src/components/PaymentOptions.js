// src/components/PaymentOptions.js
import React from 'react';
import MpesaPayment from './MpesaPayment';
import PayPalPayment from './PayPalPayment';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('yourStripePublicKey');

const PaymentOptions = () => {
  return (
    <div>
      <h2>Payment Options</h2>
      <div>
        <h3>Pay with Mpesa</h3>
        <MpesaPayment />
      </div>
      <div>
        <h3>Pay with PayPal</h3>
        <PayPalPayment />
      </div>
      <div>
        <h3>Pay with Stripe</h3>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default PaymentOptions;