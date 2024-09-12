import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductsPageComponents/ProductCard';
import { Toaster } from 'react-hot-toast';

const ProductsPageLayout = ({ products }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [batchSize] = useState(12); // Load 12 products per batch

  // Shuffle the array of variations
  const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  };

  const allVariations = products.flatMap((product) =>
    product.variations.map((variation) => ({
      ...product,
      variation,
    }))
  );

  const shuffledVariations = shuffleArray(allVariations);

  useEffect(() => {
    // Load initial batch of products when component mounts
    loadMoreProducts();
    // Listen for scroll events
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const loadMoreProducts = () => {
    setVisibleProducts((prevVisibleProducts) => {
      const start = prevVisibleProducts.length;
      const end = start + batchSize;
      const newBatch = shuffledVariations.slice(start, end);

      return [...prevVisibleProducts, ...newBatch];
    });

  };

  const handleScroll = () => {
    const screenSize = window.innerWidth;
  
    // Set a larger threshold for smaller screens
    const threshold = screenSize <= 640 ? 2000 : 1000; // 200px for small screens, 1000px for larger screens
  
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - threshold) {
      loadMoreProducts();
    }
  };
  

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleWishlist = () => {
    return "";
  };

  return (
    <div className='bg-pink-50 divide-y divide-pink-200'>
      <div><Toaster position="bottom-center" reverseOrder={false} /></div>
      {/* Optional description text */}
      {/* <div className='text-center px-10'>
        <h1 className='font-mono font-bold text-2xl pt-2'>Bra</h1>
        <div className='text-center mx-auto mb-2'>
          <p>
            {isExpanded
              ? "Women's lingerie is all about providing comfort and boosting confidence..."
              : "Women's lingerie is all about providing comfort and boosting confidence..."}
            <button className="text-primary cursor-pointer" onClick={handleToggle}>
              {isExpanded ? 'less' : 'more'}
            </button>
          </p>
        </div>
      </div> */}
      <div className="container mx-auto py-4 px-4 sm:px-2 md:px-6 lg:px-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {visibleProducts.map((item, index) => (
          <ProductCard
            key={`${item._id}-${item.variation._id}-${index}`}
            product={item}
            variation={item.variation}
            getWishlist={handleWishlist}
          />
        ))}
      </div>
    </div>
  );
};

ProductsPageLayout.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      brandname: PropTypes.string.isRequired,
      discount: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      productname: PropTypes.string.isRequired,
      variations: PropTypes.arrayOf(
        PropTypes.shape({
          color: PropTypes.string.isRequired,
          imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
          size: PropTypes.arrayOf(PropTypes.string).isRequired,
          _id: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default ProductsPageLayout;
