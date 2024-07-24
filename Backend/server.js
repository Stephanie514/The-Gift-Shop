const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const uri = process.env.MONGO_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected...');
}).catch(err => {
  console.error('MongoDB connection error:', err.message);
});

// Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', userRoutes); // Use user routes
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('/api/mpesa', require('./routes/mpesa'));
app.use('/api/paypal', require('./routes/paypal'));
app.use('/api/stripe', require('./routes/stripe'));
app.use('/api/contact', require('./routes/contactRoutes')); // corrected route path

// Root route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
