const Wishlist = require('../models/WishlistModel');
const Product = require('../models/ProductModel');

// Add to wishlist
exports.addToWishlist = async (req, res) => {
  const { productId, variationId } = req.body; // Receive variationId in the request
  const userId = req.user._id;

  try {
    const existingWishlistItem = await Wishlist.findOne({ user: userId, product: productId, variation: variationId });
    if (existingWishlistItem) {
      return res.status(400).json({ message: 'Product variation already in wishlist' });
    }

    const wishlistItem = new Wishlist({ user: userId, product: productId, variation: variationId });
    await wishlistItem.save();
    res.status(201).json({ message: 'Product variation added to wishlist', wishlistItem });
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Remove from wishlist
exports.removeFromWishlist = async (req, res) => {
  const { productId, variationId } = req.params;
  const userId = req.user._id;

  try {
    const wishlistItem = await Wishlist.findOneAndDelete({ user: userId, product: productId, variation: variationId });
    if (!wishlistItem) {
      return res.status(404).json({ message: 'Product variation not found in wishlist' });
    }

    res.status(200).json({ message: 'Product variation removed from wishlist' });
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.checkWishlistStatus = async (req, res) => {
    const { productId, variationId } = req.params;
    const userId = req.user._id;

    try {
        const wishlistItem = await Wishlist.findOne({ user: userId, product: productId, variation: variationId });
        const inWishlist = !!wishlistItem;
        res.status(200).json({ inWishlist });
    } catch (error) {
        console.error('Error checking wishlist status:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get Products from wishlist
exports.getWishlist = async (req, res) => {
  const userId = req.user._id;

  try {
    const wishlist = await Wishlist.find({ user: userId }).populate('product').populate('variation');
    res.status(200).json({ wishlist });
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
