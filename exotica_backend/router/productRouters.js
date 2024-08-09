const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Route to fetch all products
router.get('/products', productController.getProducts);

// Route to fetch products with limited fields
router.get('/productsLayoutList', productController.getLimitedProducts);

// Route to fetch a product by ID
router.get('/products/:id', productController.getProductById);

// Route to add a new product
router.post('/products', productController.addProduct);

// Route to update a product by ID
router.put('/products/:id', productController.updateProductById);

// Route to delete a product by ID
router.delete('/products/:id', productController.deleteProductById);

module.exports = router;