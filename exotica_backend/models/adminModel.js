const mongoose = require('mongoose');
const crypto = require('crypto');

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Password hashing middleware
adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = crypto.randomBytes(16).toString('hex'); // Generate a random salt
  const hashedPassword = crypto
    .pbkdf2Sync(this.password, salt, 1000, 64, 'sha512')
    .toString('hex'); // Hash the password with the salt

  this.password = `${salt}:${hashedPassword}`; // Store salt and hashed password
  next();
});

// Method to validate password
adminSchema.methods.validatePassword = function(password) {
  const [salt, hash] = this.password.split(':');
  const hashedInputPassword = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');

  return hashedInputPassword === hash; // Compare the hashes
};

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;