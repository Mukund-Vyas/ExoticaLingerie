const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Route to fetch products
router.get('/products', productController.getProducts);

router.get('/productsLayoutList', productController.getLimitedProducts);
module.exports = router;