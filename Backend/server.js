const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Ensure this line is added

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB using the direct URL
// const mongoURI = 'mongodb+srv://Stephanie:Steph@thegiftshop.5rs0434.mongodb.net/'

// mongoose.connect(mongoURI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
// });

mongoose.connect('mongodb+srv://Stephanie:Steph@thegiftshop.5rs0434.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
 .then(() => console.log('MongoDB connected'))
 .catch(err => console.error(err)); 

// Define your routes here
app.use('/api/auth', require('./routes/auth'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('/api/mpesa', require('./routes/mpesa'));
app.use('/api/paypal', require('./routes/paypal'));
app.use('/api/stripe', require('./routes/stripe'));

// Add a route handler for the root URL
app.get('/', (req, res) => {
  res.send('Server is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));