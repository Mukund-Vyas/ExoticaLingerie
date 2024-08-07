import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductsPageComponents/ProductCard';
import { Toaster } from 'react-hot-toast';

const ProductsPageLayout = ({ products }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  // Flatten all variations from all products into a single array
  const allVariations = products.flatMap((product) =>
    product.variations.map((variation) => ({
      ...product,
      variation,
    }))
  );

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

  const shuffledVariations = shuffleArray(allVariations);

  const handleWishlist = () =>{
    return "";
  }
  return (
    <div className='bg-pink-50 divide-y divide-pink-200'>
      <div><Toaster position="bottom-center" reverseOrder={false} /></div>
      <div className='text-center px-10'>
        <h1 className='font-mono font-bold text-2xl pt-2'>Bra</h1>
        <div className='text-center mx-auto mb-2'>
          <p>
            {isExpanded
              ? "Women's lingerie is all about providing comfort and boosting confidence, with bras being a key component in ensuring women feel at ease. Understanding the variety of styles available is essential for finding the perfect fit for any occasion. Different bra styles cater to diverse needs and preferences, ensuring comfort and confidence throughout the day. The options include T-shirt bras for a seamless look, padded bras for extra lift, strapless bras for shoulder-baring outfits, and sports bras for essential workout support. Push-up bras enhance natural curves, while fancy bras make a bold statement. Online shopping has revolutionized the bra-buying process, offering a convenient way to explore a wide range of designs and sizes from the comfort of home. For those seeking the perfect bra, Exotica Lingerie provides a fantastic selection, ensuring women can find styles that suit their individual preferences and needs, making every woman feel confident and comfortable."
              : "Women's lingerie is all about providing comfort and boosting confidence, with bras being a key component in ensuring women feel at ease. Understanding the variety of styles available is essential..."}
            <button className="text-primary cursor-pointer" onClick={handleToggle}>
              {isExpanded ? 'less' : 'more'}
            </button>
          </p>
        </div>
      </div>
      <div className="container mx-auto py-4 px-4 sm:px-2 md:px-6 lg:px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {shuffledVariations.map((item, index) => (
          <ProductCard
            key={`${item._id}-${item.variation._id}-${index}`}
            product={item}
            variation={item.variation}
            getWishlist = {handleWishlist}
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