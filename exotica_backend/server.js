const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./router/productRouters');
const otpRouter = require('./router/otpRouters');
const userRoutes = require('./router/userRouters');
const wishlistRoutes = require('./router/wishlistRouters');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(express.json());

// Enable CORS

const allowedOrigins = [
    'http://127.0.0.1:3000',
    'http://localhost:3000',
    'http://exoticalingerie.in',
    'http://82.112.235.138:3000'
];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
};

app.use(cors(corsOptions));

// Routes
app.use('/api/v1', productRoutes);
app.use('/api/v1', otpRouter);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/', wishlistRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));