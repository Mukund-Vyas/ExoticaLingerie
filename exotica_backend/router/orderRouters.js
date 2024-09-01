const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/authMiddleware'); 

// Routes for orders
router.post('/new-order', auth, orderController.createOrder); // Create a new order (publicly accessible)
router.get('/', auth, orderController.getAllOrders); // Get all orders (authenticated)
router.get('/:id', auth, orderController.getOrderById); // Get a single order by ID (authenticated)
router.put('/:id', auth, orderController.updateOrder); // Update an order by ID (authenticated)
router.delete('/:id', auth, orderController.deleteOrder); // Delete an order by ID (authenticated)

router.get('/user/orders', auth, orderController.getOrdersByUser);// Get all orders for a specific user
router.get('/getTrackingDetails/:orderNumber', auth, orderController.getOrderTrackingDetails);// Get all orders for a specific user
module.exports = router;
