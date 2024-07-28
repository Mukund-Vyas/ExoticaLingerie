const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./router/productRoutes');
const otpRouter = require('./router/otpRouter');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(express.json());

// Enable CORS
app.use(cors());

// Routes
app.use('/api/v1', productRoutes);
app.use('/api/v1', otpRouter);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to MongoDB'));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));