// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET;

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET);
    req.admin = decoded;
    req.isAdmin = true;
    
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token is invalid or expired' });
  }
};

module.exports = authMiddleware;
