const express = require('express');
const { sendEmailOtp, validateEmailOtp, sendMSGOTP, verifyMSGOTP, resendMSGOTP } = require('../controllers/otpController');

const router = express.Router();

router.post('/send-otp', sendEmailOtp);
router.post('/validate-otp', validateEmailOtp);
router.post('/send-mobile-otp', sendMSGOTP);
router.post('/verify-mobile-otp', verifyMSGOTP);
router.post('/resend-mobile-otp', resendMSGOTP);

module.exports = router;