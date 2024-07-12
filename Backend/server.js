const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB using the direct URL
const mongoURI = 'mongodb://localhost:27017/use_giftshop'; // Replace with your actual URI

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define your routes here
app.use('/api/auth', require('./routes/auth'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('/api/mpesa', require('./routes/mpesa'));
app.use('/api/paypal', require('./routes/paypal'));
app.use('/api/stripe', require('./routes/stripe'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));