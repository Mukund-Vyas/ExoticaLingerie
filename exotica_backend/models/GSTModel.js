const mongoose = require('mongoose');

const GSTSchema = new mongoose.Schema({
    GST: {
      type: Number,
      required: [true, 'GST is require']
    }
  });

module.exports = mongoose.model('products',productSchema);