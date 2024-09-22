// routes/adminRoutes.js
const express = require('express');
const { loginAdmin, registerAdmin } = require('../controllers/adminController');
const auth = require('../middleware/adminAuthMiddleware');

const router = express.Router();

// Public login route
router.post('/login', loginAdmin);

router.post('/register', registerAdmin);

module.exports = router;
