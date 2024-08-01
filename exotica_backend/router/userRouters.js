const express = require('express');
const auth = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

const router = express.Router();

// Find user by email or mobile and return token
router.post('/find-user', userController.findUser);

// Add partial information
router.post('/add-partial-info', userController.addPartialInfo);

// Add address for existing user
router.post('/add-address', auth, userController.addAddress);

// get user data
router.get('/get-user', auth, userController.getUserData);

// Login
router.post('/login', userController.login);

// Refresh token
router.post('/refresh-token', userController.refreshToken);

module.exports = router;