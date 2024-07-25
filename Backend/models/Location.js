// Backend/models/Location.js

const mongoose = require('mongoose');

const WardSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

const SubcountySchema = new mongoose.Schema({
  name: { type: String, required: true },
  wards: [WardSchema]
});

const CountySchema = new mongoose.Schema({
  name: { type: String, required: true },
  subcounties: [SubcountySchema]
});

const Location = mongoose.model('Location', CountySchema);

module.exports = Location;
