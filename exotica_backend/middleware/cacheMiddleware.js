const client = require('../redis');

// Middleware function to cache responses using Redis
const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl; // Using request URL as cache key

  client.get(key, (err, data) => {
    if (err) throw err;

    if (data !== null) {
      // If data exists in cache, return cached response
      res.send(JSON.parse(data));
    } else {
      // If data does not exist in cache, proceed with the next middleware
      next();
    }
  });
};

module.exports = cacheMiddleware;