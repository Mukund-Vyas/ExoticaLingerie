const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  ip: String,   // IP address of the visitor
  page: String, // Page visited
  timestamp: { type: Date, default: Date.now } // Visit time
});

module.exports = mongoose.model('Visit', visitSchema);
