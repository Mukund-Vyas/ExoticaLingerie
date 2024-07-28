const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pinCode: { type: String, required: true, match: [/^\d{6}$/, 'Invalid pin code'] }, // Matches 6 digit Indian Pin code
  country: { type: String, required: true }
});

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, sparse: true, match: [/.+\@.+\..+/, 'Invalid email address'] }, // Simple email validation
  mobile: { type: String, unique: true, sparse: true, match: [/^\d{10}$/, 'Invalid mobile number'] }, // Matches 10 digit mobile number
  mobileVerified: { type: Boolean, default: false },
  emailVerified: { type: Boolean, default: false },
  addresses: [addressSchema],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);