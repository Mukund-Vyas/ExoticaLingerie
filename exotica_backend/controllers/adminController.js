// controllers/adminController.js
const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');

const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET;

// Admin login controller
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
  
    if (!admin) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
  
    // Validate the password using the new method
    if (!admin.validatePassword(password)) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
  
    // Create JWT token with role
    const token = jwt.sign(
      { id: admin._id, role: admin.role }, // Include role in token payload
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    );
  
    return res.json({ token });
  };

  // Create a new admin
const registerAdmin = async (req, res) => {
    const { email, password } = req.body;
  
    // Check if the admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }
  
    // Create a new admin instance
    const newAdmin = new Admin({ email, password });
  
    try {
      await newAdmin.save(); // Save the new admin to the database
      return res.status(201).json({ message: 'Admin created successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Error creating admin', error });
    }
  };

module.exports = {
  loginAdmin, registerAdmin,
};