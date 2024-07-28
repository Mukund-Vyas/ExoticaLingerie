const OTP = require('../models/otpModel');
const { sendOtpEmail, generateOtp } = require('../utils/otpmailer');

const sendOtp = async (req, res) => {
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

const validateOtp = async (req, res) => {
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

    return res.status(400).json({ error: 'Invalid OTP' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to validate OTP' });
  }
};

module.exports = {
  sendOtp,
  validateOtp,
};