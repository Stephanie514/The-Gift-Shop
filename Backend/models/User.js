// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  addresses: {
    type: [
      {
        address: { type: String },
        isDefault: { type: Boolean, default: false }
      }
    ],
    default: []
  },
  orders: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order' // Assuming you have an Order model
      }
    ],
    default: []
  },
  cart: {
    type: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // Assuming you have a Product model
        quantity: { type: Number, default: 1 }
      }
    ],
    default: []
  },
  shops: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop'
  }]
});

module.exports = mongoose.model('User', UserSchema);
