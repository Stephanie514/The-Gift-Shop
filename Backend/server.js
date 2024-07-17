const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Ensure this line is added
const dotenv = require('dotenv'); // Add this line

dotenv.config(); // Add this line to load the environment variables

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
const uri = process.env.MONGO_URI;
mongoose.set('strictQuery', false);
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected...');
}).catch(err => {
    console.error('MongoDB connection error:', err.message);
}); 

// Define your routes here
app.use('/api/auth', require('./routes/auth'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('/api/mpesa', require('./routes/mpesa'));
app.use('/api/paypal', require('./routes/paypal'));
app.use('/api/stripe', require('./routes/stripe'));
app.use('api/Contact', require('./routes/ContactRoutes'));

// Add a route handler for the root URL
app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.post('/api/Contact', (req, res) => {
    const { name, email, message } = req.body;
    // Here you can handle the message logic, like sending an email or saving to a database
    // For simplicity, let's just log the message
    console.log(`Message received from ${name} (${email}): ${message}`);
    // Send a response back to the client
    res.status(200).json({ message: 'Message received successfully!' });
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));