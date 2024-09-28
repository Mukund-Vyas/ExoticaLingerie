import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { GoHeart, GoHeartFill } from "react-icons/go";
import Modal from './SizeModel';
import { useCart } from '@/src/contexts/CartContext';
import toast from 'react-hot-toast';
import api from '@/src/utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { setProfileOpen } from '@/Redux/Reducers/profileSlice';
import Link from 'next/link';
import Image from 'next/image';

const ProductCard = ({ product, variation, getWishlist }) => {
  const discountedPrice = product.price - (product.price * (product.discount / 100));
  const { dispatch } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  // const authToken = useLocalStorage('authToken'); // Use the custom hook
  const { authToken } = useSelector((state) => state.user);
  const { profileOpen } = useSelector((state) => state.profile);
  const authdispatch = useDispatch();

  useEffect(() => {
    const checkWishlistStatus = async () => {
      try {
        const response = await api.get(`/wishlist/check/${product._id}/${variation._id}`, {
          headers: {
            'x-auth-token': authToken,
          },
        });
        setIsInWishlist(response.data.inWishlist);
      } catch (error) {
        console.error('Error checking wishlist status:', error);
      }
    };

    if (authToken) {
      checkWishlistStatus();
    }
    else {
      setIsInWishlist(false);
    }

  }, [product._id, variation._id, authToken]);

  const handleAddToCart = (variation) => {
    setSelectedVariation(variation);
    setIsModalOpen(true);
  };

  const handleSizeSelect = (size, color) => {
    const productToAdd = {
      ...product,

      price: product.price,
      variation: selectedVariation,
      size: size,
      color: color,
      discountedPrice: product.price - (product.price * (product.discount / 100)),
    };

    dispatch({ type: 'ADD_TO_CART', payload: productToAdd });
    setIsModalOpen(false);
    toast.success('Product added to cart.', {
      style: {
        border: '1px solid #ff197d',
        padding: '16px',
      },
      iconTheme: {
        primary: 'rgb(15 118 110)',
        secondary: '#FFFAEE',
      },
    });
  };

  const addToWishlist = async () => {
    try {
      await api.post('/wishlist', { productId: product._id, variationId: variation._id }, {
        headers: {
          'x-auth-token': authToken,
        },
      });
      setIsInWishlist(true);
      getWishlist()
      toast.success('Product added to wishlist.');
    } catch (error) {
      authdispatch(setProfileOpen({ isOpen: !profileOpen }))
      toast.error('Failed to add product to wishlist. Please Login first');
    }
  };

  const removeFromWishlist = async () => {
    try {
      await api.delete(`/wishlist/${product._id}/${variation._id}`, {
        headers: {
          'x-auth-token': authToken,
        },
      });
      setIsInWishlist(false);
      getWishlist()
      toast.success('Product removed from wishlist.');
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      toast.error('Failed to remove product from wishlist.');
    }
  };

  return (
    <>
      <div className="relative flex flex-col justify-end border p-3 max-sm:p-1 rounded-md shadow-md bg-white">
        <div className="absolute top-5 right-5 max-sm:top-1 max-sm:right-1">
          <button
            className={`text-xl p-2 max-sm:text-lg max-sm:p-1.5 rounded-full ${isInWishlist ? 'text-red-500' : 'text-primary'} hover:text-red-500 bg-rose-100`}
            onClick={() => isInWishlist ? removeFromWishlist() : addToWishlist()}
          >
            {isInWishlist ? <GoHeartFill /> : <GoHeart />}
          </button>
        </div>
        {product.discount > 0 && (
          <div className="absolute top-1 -left-1">
            <div className="relative bg-blue-500 text-white px-3 max-sm:px-2 py-1 rounded-tl-md rounded-br-md transform -rotate-12 shadow-lg">
              <div className="absolute top-0 left-0 w-2 h-2 bg-blue-700 rounded-full"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-blue-700 rounded-full"></div>
              <span className="block text-xs font-bold max-sm:text-[0.50rem">{product.discount}% off</span>
            </div>
          </div>
        )}
        <Link href={`/products/item/${product._id}?color=${variation.color}?productname=${encodeURIComponent(product.productname)}`}>
          <Image
            src={`${process.env.NEXT_PUBLIC_Image_URL}/${variation.imageUrls[0]}`}
            alt={`${variation.color} ${product.productname}`}
            className="rounded-md bg-gray-100 pointer-events-none"
            layout="responsive"  // Ensures responsiveness
            width={500}          // Set the width of the image (or use dynamic values)
            height={300}         // Set the height of the image (or use dynamic values)
            objectFit="cover"    // Similar to object-cover in Tailwind
            placeholder="blur"   // Optional: add a blur-up placeholder
            blurDataURL="/Images/Posters/placeholder.webp"  // Optional: tiny image used as a blur-up effect
            loading="lazy"
          />
        </Link>
        <div >
          <div>
            <div className="flex justify-between gap-2 mt-4 max-sm:text-sm">
              <h2 className='block text-sm max-sm:text-xs sm:hidden'>
                {product.productname.length > 16
                  ? `${product.productname.slice(0, 36)}...`
                  : product.productname} - {variation.color}
              </h2>
              <h2 className='hidden text-sm max-sm:text-xs sm:block'>
                {product.productname} - {variation.color}
              </h2>
            </div>
            <div className="flex flex-col items-end">
              <h1 className='text-primary text-nowrap font-bold max-sm:text-xs'>₹{discountedPrice.toFixed(2)}</h1>
              <p className='text-gray-600 line-through text-xs'>M.R.P.:{product.price.toFixed(2)}</p>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              className="bg-primary text-white px-4 py-1.5 max-sm:px-3 max-sm:py-1 max-sm:text-sm font-medium rounded-full shadow hover:bg-rose-600"
              onClick={() => handleAddToCart(variation)}
            >
              Add to Cart
            </button>
          </div>
        </div>

      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className='min-w-fit'>
          <h2 className='font-serif'>Select Size</h2>
          <ul className='flex gap-1 mt-2 flex-wrap'>
            {selectedVariation?.size?.map(size => (
              <li key={size} className='text-gray-600 hover:text-primary px-4 py-1 border rounded-full hover:border-primary cursor-pointer'>
                <button onClick={() => handleSizeSelect(size, variation.color)}>
                  {size}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </Modal>
    </>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
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
  }).isRequired,
  variation: PropTypes.shape({
    color: PropTypes.string.isRequired,
    imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
    size: PropTypes.arrayOf(PropTypes.string).isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  getWishlist: PropTypes.func.isRequired,
};

export default ProductCard;
