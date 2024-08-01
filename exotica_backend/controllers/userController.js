const User = require('../models/userModel');
const { generateAccessToken, generateRefreshToken } = require('../utils/jwtUtils');
const { encrypt, decrypt } = require('../models/userModel');

// Find user by email or mobile and return token
exports.findUser = async (req, res) => {
    const { email, mobile } = req.body;

    if (!email && !mobile) {
        return res.status(400).send('Email or mobile number must be provided.');
    }

    let encryptedEmail, encryptedMobile;
    if (email) {
        try {
            encryptedEmail = encrypt(email);
        } catch (error) {
            console.error('Encryption error for email:', error.message);
            return res.status(500).send('Internal server error.');
        }
    }

    if (mobile) {
        try {
            encryptedMobile = encrypt(mobile);
        } catch (error) {
            console.error('Encryption error for mobile:', error.message);
            return res.status(500).send('Internal server error.');
        }
    }

    // Build query object dynamically
    const query = {};
    if (encryptedEmail) {
        query.email = encryptedEmail;
    }
    if (encryptedMobile) {
        query.mobile = encryptedMobile;
    }

    try {
        console.log(encryptedEmail);
        const user = await User.findOne(query);
        console.log(user);

        if (!user) {
            return res.status(404).send('User not found.');
        }

        const accessToken = generateAccessToken({ _id: user._id });
        const refreshToken = generateRefreshToken({ _id: user._id });

        user.refreshToken = refreshToken;
        await user.save();

        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'Strict' });
        res.send({ accessToken });
    } catch (error) {
        console.error('Error finding user:', error.message);
        res.status(500).send('Internal server error.');
    }
};

// Add partial information
exports.addPartialInfo = async (req, res) => {
    const { firstName, lastName, email, mobile, mobileVerified, emailVerified } = req.body;

    const encryptedEmail = encrypt(email);
    const encryptedMobile = encrypt(mobile);
    const query = {};
    if (encryptedEmail) {
        query.email = encryptedEmail;
    }
    if (encryptedMobile) {
        query.mobile = encryptedMobile;
    }

    try {
        const existingUser = await User.findOne(query);
        
        if (existingUser) {
            return res.status(409).send('User with this email or mobile number already exists.');
        }

        // Create a new user if none exists
        const user = new User({
            firstName,
            lastName,
            email: email,
            mobile: mobile,
            mobileVerified,
            emailVerified
        });
        await user.save();

        // Generate tokens
        const accessToken = generateAccessToken({ _id: user._id });
        const refreshToken = generateRefreshToken({ _id: user._id });

        user.refreshToken = refreshToken;
        await user.save();

        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'Strict' });
        res.status(201).send({ accessToken });
    } catch (error) {
        console.error('Error adding user:', error.message);
        res.status(500).send('Internal server error.');
    }
};


// Add address for existing user
exports.addAddress = async (req, res) => {
    const { street, city, state, pinCode, country } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).send('User not found.');

    user.addresses.push({ street, city, state, pinCode, country });
    await user.save();

    res.send(user);
};

// Login
exports.login = async (req, res) => {
    const { email, mobile } = req.body;
    const encryptedEmail = encrypt(email);
    const encryptedMobile = encrypt(mobile);
    const user = await User.findOne({ $or: [{ email: encryptedEmail }, { mobile: encryptedMobile }] });

    if (!user) return res.status(404).send('User not found.');

    const accessToken = generateAccessToken({ _id: user._id });
    const refreshToken = generateRefreshToken({ _id: user._id });

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'Strict' });
    res.send({ accessToken });
};

// Refresh token
exports.refreshToken = async (req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) return res.sendStatus(401);

    try {
        const user = await User.findOne({ refreshToken });
        if (!user) return res.sendStatus(403);

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, userPayload) => {
            if (err) return res.sendStatus(403);

            const accessToken = generateAccessToken({ _id: userPayload._id });
            res.send({ accessToken });
        });
    } catch (err) {
        res.sendStatus(500);
    }
};

//get user data
exports.getUserData = async (req, res) => {
    try {
        // Fetch the user data from the database, excluding password and refreshToken
        const user = await User.findById(req.user._id).select('-password -refreshToken');
        if (!user) return res.status(404).send('User not found.');

        // Decrypt the email and mobile fields
        const decryptedEmail = decrypt(user.email);
        const decryptedMobile = decrypt(user.mobile);

        // Send the user data with decrypted fields
        res.send({
            ...user.toObject(),
            email: decryptedEmail,
            mobile: decryptedMobile
        });
    } catch (error) {
        console.error('Error fetching user data:', error.message);
        res.status(500).send('Internal server error.');
    }
};