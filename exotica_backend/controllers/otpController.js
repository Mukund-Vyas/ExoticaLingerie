const OTP = require('../models/otpModel');
const { sendOtpEmail, generateOtp } = require('../utils/otpmailer');
const axios = require('axios');

const sendEmailOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const otp = generateOtp();

  try {
    await sendOtpEmail(email, otp);
    const otpDoc = new OTP({ email, otp });
    await otpDoc.save();
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send OTP' });
  }
};

const validateEmailOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: 'Email and OTP are required' });
  }

  try {
    const otpDoc = await OTP.findOne({ email, otp });

    if (otpDoc) {
      await OTP.deleteOne({ _id: otpDoc._id }); // Remove OTP after successful validation
      return res.status(200).json({ message: 'OTP validated successfully' });
    }

    return res.status(204).json({ error: 'Invalid OTP' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to validate OTP' });
  }
};

// MSG91 Mobile OTP Integration
const sendMSGOTP = async (req, res) => {
  const { mobileNumber } = req.body;

  try {
    const response = await axios.post('https://api.msg91.com/api/v5/otp', {
      mobile: mobileNumber,
      authkey: process.env.MSG91_AUTH_KEY,
      template_id: process.env.MSG91_OTP_TEMPLATE_ID,
      otp_length: 6,
    }, {
      'Content-Type': 'application/json',
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to send OTP' });
  }
};

// Verify OTP
const verifyMSGOTP = async (req, res) => {
  const { mobileNumber, otp } = req.body;

  const options = {
    method: 'GET',
    url: 'https://control.msg91.com/api/v5/otp/verify',
    params: {otp: otp, mobile: mobileNumber},
    headers: {authkey: process.env.MSG91_AUTH_KEY}
  };
  try {
    const response = await axios.request(options);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to verify OTP' });
  }
};

// Resend OTP
const resendMSGOTP = async (req, res) => {
  const { mobileNumber } = req.body;

  const options = {
    method: 'GET',
    url: 'https://control.msg91.com/api/v5/otp/retry',
    params: {authkey: process.env.MSG91_AUTH_KEY, retrytype: 'text', mobile: mobileNumber}
  };
  try {
    const response = await axios.request(options);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to resend OTP' });
  }
};

module.exports = {
  sendEmailOtp,
  validateEmailOtp,
  sendMSGOTP,
  verifyMSGOTP,
  resendMSGOTP,
};