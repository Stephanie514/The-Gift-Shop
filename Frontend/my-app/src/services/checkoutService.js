import axios from 'axios';

// Define the API base URL if it's not already defined
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

// Function to handle Stripe payment
export const initiateStripePayment = async (cartItems) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/checkout/stripe`, { cartItems });
    return response.data;
  } catch (error) {
    console.error('Error initiating Stripe payment:', error);
    throw error;
  }
};

// Function to handle PayPal payment
export const initiatePayPalPayment = async (cartItems) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/checkout/paypal`, { cartItems });
    return response.data;
  } catch (error) {
    console.error('Error initiating PayPal payment:', error);
    throw error;
  }
};

// Function to handle Mpesa payment
export const initiateMpesaPayment = async (cartItems) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/checkout/mpesa`, { cartItems });
    return response.data;
  } catch (error) {
    console.error('Error initiating Mpesa payment:', error);
    throw error;
  }
};