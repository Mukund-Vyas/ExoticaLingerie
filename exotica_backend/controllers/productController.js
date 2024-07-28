const Product = require('../models/ProductModel');

// Controller function to handle GET request for fetching products
const getProducts = async (req, res) => {
  try {
    // Fetch products from the database
    const products = await Product.find();

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to get products with limited fields
const getLimitedProducts = async (req, res) => {
  try {
    // Retrieve products with specified fields only
    const products = await Product.find({}, '_id productname brandname price discount variations');

    res.json(products);
  } catch (error) {
    console.error('Error fetching limited products:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


module.exports = {
  getProducts,
  getLimitedProducts
};