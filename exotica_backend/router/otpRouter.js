const express = require('express');
const { sendOtp, validateOtp } = require('../controllers/otpController');

const router = express.Router();

router.post('/send-otp', sendOtp);
router.post('/validate-otp', validateOtp);

module.exports = router;