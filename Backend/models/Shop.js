const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shopSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }]
}, { timestamps: true });

module.exports = mongoose.model('Shop', shopSchema);
