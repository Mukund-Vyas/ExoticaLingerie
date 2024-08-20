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
  productSubCategory: {
    type: String,
  },
  productFeatures: [{
    title: {
      type: String,
    },
    description: {
      type: String,
    }
  }],
  variations: [{
    color: {
      type: String,
    },
    size: [{
      type: String,
    }],
    SKU: {
      type: String,
      required: [true, 'SKU is required for each variation']
    },
    imageUrls: [{
      type: String // Store image URLs instead of image data
    }]
  }],
  productDescription: {
    type: String,
  },
  productWashcare: {
    type: String,
  },
  material: {
    type: String, // Optional field for material
  },
  productCode: {
    type: String, // Optional unique code for the product
  },
  stockAvailability: {
    type: Number, // Optional field for tracking stock levels
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