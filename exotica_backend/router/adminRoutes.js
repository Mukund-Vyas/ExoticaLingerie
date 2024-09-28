// routes/adminRoutes.js
const express = require('express');
const { loginAdmin, registerAdmin } = require('../controllers/adminController');
const { getUsersForAdminList } = require('../controllers/userController');
const auth = require('../middleware/adminAuthMiddleware');

const router = express.Router();

// Public login route
router.post('/login', loginAdmin);

// register new admin user
router.post('/register', registerAdmin);

// get users data
router.get('/get-site-users', auth, getUsersForAdminList)
module.exports = router;
