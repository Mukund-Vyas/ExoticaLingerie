const mongoose = require('mongoose');
const crypto = require('crypto');

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pinCode: { type: String, required: true, match: [/^\d{6}$/, 'Invalid pin code'] },
  country: { type: String, required: true },
  mobile: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true }
});

addressSchema.pre('save', function(next) {
  if (this.isModified('street')) {
    this.street = encrypt(this.street);
  }
  if (this.isModified('city')) {
    this.city = encrypt(this.city);
  }
  if (this.isModified('state')) {
    this.state = encrypt(this.state);
  }
  if (this.isModified('pinCode')) {
    this.pinCode = encrypt(this.pinCode);
  }
  if (this.isModified('country')) {
    this.country = encrypt(this.country);
  }
  if (this.isModified('mobile')) {
    this.mobile = encrypt(this.mobile);
  }
  if (this.isModified('firstName')) {
    this.firstName = encrypt(this.firstName);
  }
  if (this.isModified('lastName')) {
    this.lastName = encrypt(this.lastName);
  }
  next();
});

addressSchema.methods.decryptFields = function() {
  this.street = decrypt(this.street);
  this.city = decrypt(this.city);
  this.state = decrypt(this.state);
  this.pinCode = decrypt(this.pinCode);
  this.country = decrypt(this.country);
  this.mobile = decrypt(this.mobile);
  this.firstName = decrypt(this.firstName);
  this.lastName = decrypt(this.lastName);
};

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, sparse: true },
  mobile: { type: String, unique: true, sparse: true },
  mobileVerified: { type: Boolean, default: false },
  emailVerified: { type: Boolean, default: false },
  addresses: [addressSchema],
  refreshToken: { type: String },
}, { timestamps: true });

userSchema.pre('save', function(next) {
  if (this.isModified('email') || this.isNew) {
    this.email = encrypt(this.email);
  }
  if (this.isModified('mobile') || this.isNew) {
    this.mobile = encrypt(this.mobile);
  }
  next();
});

userSchema.methods.decryptAddressFields = function() {
  this.addresses.forEach(address => address.decryptFields());
};

function encrypt(text) {
  if (!text) {
    throw new TypeError('Text to encrypt must be a non-empty string');
  }

  const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
  const iv = Buffer.from(process.env.IV, 'hex');

  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

function decrypt(text) {
  if (!text) {
    throw new TypeError('Text to decrypt must be a non-empty string');
  }

  const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
  const iv = Buffer.from(process.env.IV, 'hex');

  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(text, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

module.exports = mongoose.model('User', userSchema);
module.exports.encrypt = encrypt;
module.exports.decrypt = decrypt;