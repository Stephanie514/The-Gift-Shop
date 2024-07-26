// models/Product.js
const mongoose = require('mongoose');
const { Schema } = mongoose; // Destructure Schema from mongoose

// Schema for product reviews
const reviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Schema for products
const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: false
  },
  images: {
    type: [String],
    required: false
  },
  reviews: [reviewSchema],
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  occasion: {
    type: [String],
    default: []
  },
  shop: {
    type: Schema.Types.ObjectId,
    ref: 'Shop',
    required: true
  },
  gender: {
    type: String,
    enum: ['His', 'Her', 'Non-Binary'],
    default: 'Non-Binary' // Adjust the default value as per requirement
  },
  stockNumbers: {
    type: Number,
    min: 0,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create and export the Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
