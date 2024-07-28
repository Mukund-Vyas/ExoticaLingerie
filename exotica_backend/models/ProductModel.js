const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productSKU: {
    type: String,
    required: [true, 'product SKU is required']
  },
  brandname: {
    type: String,
    required: [true, 'brand name is required']
  },
  productname: {
    type: String,
    required: [true, 'product name is required']
  },
  productCategory: {
    type: String,
    required: [true, 'product category is required']
  },
  productFeatures: {
    title: {
      type: String,
    },
    description: {
      type: String,
    }
  },
  variations: [{
    color: {
      type: String,
    },
    imageUrls: [{
      type: String // Store image URLs instead of image data
    }],
    size: [{
      type: String,
    }]
  }],
  productDescription: {
    type: String,
  },
  productWashcare: {
    type: String,
  },
  price: {
    type: Number,
    required: [true, 'Product price is required']
  },
  discount: {
    type: Number
  },
  GST: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GST"
  }
});

module.exports = mongoose.model('products', productSchema);