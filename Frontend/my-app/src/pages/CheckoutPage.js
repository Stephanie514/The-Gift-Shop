/*import React from 'react';
import Checkout from '../components/Checkout';

const CheckoutPage = () => {
  return (
    <div>
      <h1>Checkout</h1>
      <Checkout />
    </div>
  );
};

export default CheckoutPage;*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //const navigate = useNavigate();

  useEffect(() => {
    // Fetch cart items from API
    axios.get('/api/cart/view')
      .then(response => {
        setCartItems(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching cart items:', error);
        setIsLoading(false);
      });
  }, []);

  const handleStripePayment = async () => {
    try {
      const { data } = await axios.post('/api/checkout/stripe');
      window.location.href = data.url; // Redirect to Stripe checkout page
    } catch (error) {
      console.error('Error initiating Stripe payment:', error);
    }
  };

  const handlePayPalPayment = async () => {
    try {
      const { data } = await axios.post('/api/checkout/paypal');
      window.location.href = data.approval_url; // Redirect to PayPal payment page
    } catch (error) {
      console.error('Error initiating PayPal payment:', error);
    }
  };

  const handleMpesaPayment = async () => {
    try {
      const { data } = await axios.post('/api/checkout/mpesa');
      window.location.href = data.redirect_url; // Redirect to Mpesa payment page
    } catch (error) {
      console.error('Error initiating Mpesa payment:', error);
    }
  };

  const handlePayment = (paymentMethod) => {
    switch (paymentMethod) {
      case 'stripe':
        handleStripePayment();
        break;
      case 'paypal':
        handlePayPalPayment();
        break;
      case 'mpesa':
        handleMpesaPayment();
        break;
      default:
        console.error('Invalid payment method');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Checkout</h1>
      <div>
        <h2>Cart Summary</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty. <a href="/products">Continue Shopping</a></p>
        ) : (
          <div>
            {cartItems.map(item => (
              <div key={item._id}>
                <h3>{item.product.name}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.product.price}</p>
              </div>
            ))}
            <button onClick={() => handlePayment('stripe')}>Pay with Stripe</button>
            <button onClick={() => handlePayment('paypal')}>Pay with PayPal</button>
            <button onClick={() => handlePayment('mpesa')}>Pay with Mpesa</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;