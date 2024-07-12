// src/components/MpesaPayment.js
import React, { useState } from 'react';
import axios from 'axios';

const MpesaPayment = () => {
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState(1000); // Example amount

  const handlePayment = async () => {
    try {
      const res = await axios.post('/api/mpesa/stkpush', { phone, amount });
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Enter phone number"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
      <button onClick={handlePayment}>Pay with Mpesa</button>
    </div>
  );
};

export default MpesaPayment;