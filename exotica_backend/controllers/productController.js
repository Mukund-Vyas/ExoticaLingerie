const Product = require('../models/ProductModel');

// Controller function to handle GET request for fetching all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to get products with limited fields
const getLimitedProducts = async (req, res) => {
  try {
    const products = await Product.find({}, '_id productname brandname price discount variations');
    res.json(products);
  } catch (error) {
    console.error('Error fetching limited products:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller function to handle GET request for fetching a product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to handle POST request for adding a new product
const addProduct = async (req, res) => {
  const product = new Product(req.body);

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Controller function to handle PUT request for updating an existing product by ID
const updateProductById = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Controller function to handle DELETE request for removing a product by ID
const deleteProductById = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProductsBySubcategory = async (req, res) => {
  try {
    // Extract the subcategory from request query parameters
    const subcategory = req.params.subcategory;

    // Check if the subcategory is provided
    if (!subcategory) {
      return res.status(400).json({ message: 'Subcategory is required' });
    }

    // Find products matching the given subcategory
    const products = await Product.find({ productSubCategory: subcategory });

    // If no products found, return a 404 status
    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found for this subcategory' });
    }

    // Return the products
    res.json(products);
  } catch (error) {
    console.error('Error fetching products by subcategory:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getProducts,
  getLimitedProducts,
  getProductById,
  addProduct,
  updateProductById,
  deleteProductById,
  getProductsBySubcategory
};
