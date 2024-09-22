const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./router/productRouters');
const otpRouter = require('./router/otpRouters');
const userRoutes = require('./router/userRouters');
const wishlistRoutes = require('./router/wishlistRouters');
const dotenv = require('dotenv');
const cors = require('cors');
const paymentRouters = require('./router/paymentRouters');
const orderRoutes = require('./router/orderRouters'); 
const blogRoutes = require('./router/blogRoutes'); 
const visitRoutes = require('./router/visitRoutes'); 
const adminRoutes = require('./router/adminRoutes'); 
const path = require('path');

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(express.json());

// Images url
// Set valid image extensions
const validExtensions = ['.png', '.jpg', '.jpeg', '.webp'];

// Middleware to validate file extensions
app.use('/images', (req, res, next) => {
    const ext = path.extname(req.url).toLowerCase(); // Get the file extension
    if (!validExtensions.includes(ext)) {
        return res.status(403).send('Forbidden: Invalid file type');
    }
    next();
});

// Serve static images with caching
app.use('/images', express.static(path.join(__dirname, 'images'), {
    maxAge: '1d',  // Cache images for 1 day
    fallthrough: false,  // Prevent further routing when a file is served
    setHeaders: (res, filePath) => {
        // Ensure valid extensions are served with correct headers
        const ext = path.extname(filePath).toLowerCase();
        if (validExtensions.includes(ext)) {
            res.setHeader('Cache-Control', 'public, max-age=86400');  // Cache headers for 1 day (86400 seconds)
        }
    }
}));

// Enable CORS
const allowedOrigins = [
    'http://127.0.0.1:3000',
    'http://localhost:3000',
    'http://exoticalingerie.in',
    'https://exoticalingerie.in',
    'http://82.112.235.138:3000',
    'https://www.exoticalingerie.in',
    'https://api.exoticalingerie.in',
    'https://www.api.exoticalingerie.in',
    'https://mercury-t2.phonepe.com',
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
app.use('/api/v1/payment', paymentRouters);
app.use('/api/v1/order', orderRoutes);
app.use('/api/v1/blog', blogRoutes);
app.use('/api/v1/sitevisits', visitRoutes);
app.use('/api/v1/admin', adminRoutes);

// Catch-all route for handling 404
app.use((req, res) => {
    res.status(404).send('Not Found');
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));