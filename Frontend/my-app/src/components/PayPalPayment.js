// src/components/PayPalPayment.js
import React, { useEffect } from 'react';
import axios from 'axios';

const PayPalPayment = () => {
  useEffect(() => {
    const loadPaypalScript = async () => {
      const script = document.createElement('script');
      script.src = 'https://www.paypal.com/sdk/js?client-id=yourClientId';
      script.async = true;
      script.onload = () => {
        window.paypal.Buttons({
          createOrder: async () => {
            const res = await axios.post('/api/paypal/create-order');
            return res.data.id;
          },
          onApprove: async (data) => {
            const res = await axios.post('/api/paypal/capture-order', {
              orderID: data.orderID,
            });
            console.log(res.data);
          },
        }).render('#paypal-button-container');
      };
      document.body.appendChild(script);
    };

    loadPaypalScript();
  }, []);

  return <div id="paypal-button-container"></div>;
};

export default PayPalPayment;