const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const auth = require('../middleware/authMiddleware');

// Route to initiate payment
router.post('/new-payment', auth, paymentController.newPayment);

// Route to check payment status
router.get('/status/:txnId', auth, paymentController.checkStatus);

module.exports = router;
