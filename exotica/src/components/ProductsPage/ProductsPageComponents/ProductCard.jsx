import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { GoHeart } from "react-icons/go";
import Modal from './SizeModel';
import { useCart } from '@/src/contexts/CartContext';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
    const randomVariation = product.variations[Math.floor(Math.random() * product.variations.length)];
    const discountedPrice = product.price - (product.price * (product.discount / 100));
    const { dispatch } = useCart();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVariation, setSelectedVariation] = useState(null);

    const handleAddToCart = (variation) => {
        setSelectedVariation(variation);
        setIsModalOpen(true);
    };

    const handleSizeSelect = (size) => {
        const productToAdd = {
            ...product,
            variation: selectedVariation,
            size,
            discountedPrice,
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

    return (
        <div className="relative border p-3 rounded-md shadow-md bg-white">
            {/* Wishlist Icon */}
            <div className="absolute top-5 right-5">
                <button className="text-primary text-xl hover:text-red-500 bg-rose-100 p-2 rounded-full">
                    <GoHeart />
                </button>
            </div>

            {/* Discount Label */}
            {product.discount > 0 && (
                <div className="absolute top-1 -left-1">
                    <div className="relative bg-blue-500 text-white px-3 py-1 rounded-tl-md rounded-br-md transform -rotate-12 shadow-lg">
                        <div className="absolute top-0 left-0 w-2 h-2 bg-blue-700 rounded-full"></div>
                        <div className="absolute bottom-0 right-0 w-2 h-2 bg-blue-700 rounded-full"></div>
                        <span className="block text-xs font-bold">{product.discount}% off</span>
                    </div>
                </div>
            )}

            {/* Product Image */}
            <img
                src={randomVariation.imageUrls[0]}
                alt={`${randomVariation.color} ${product.productname}`}
                className="w-full object-cover rounded-md bg-gray-100"
            />
            {/* Product Info */}
            <div className="flex justify-between gap-2 mt-4">
                <div>
                    <h2 className='text-sm'>
                        {product.brandname} {product.productname} - {randomVariation.color}
                    </h2>
                </div>
                <div className="flex flex-col items-end">
                    <h1 className='text-primary text-nowrap font-bold'>₹{discountedPrice.toFixed(2)}</h1>
                    <p className='text-gray-600 line-through text-sm'>₹{product.price.toFixed(2)}</p>
                </div>
            </div>
            <div className="flex justify-end mt-4">
                <button
                    className="bg-primary text-white px-4 py-1.5 rounded-full shadow hover:bg-rose-600"
                    onClick={() => handleAddToCart(randomVariation)}
                >
                    Add to Cart
                </button>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div>
                    <h2 className='font-serif'>Select Size</h2>
                    <ul className='flex gap-1 mt-2'>
                        {selectedVariation?.size?.map(size => (
                            <li key={size} className='text-gray-600 hover:text-primary px-4 py-1 border rounded-full hover:border-primary cursor-pointer'>
                                <button onClick={() => handleSizeSelect(size)}>
                                    {size}
                                </button>
                            </li>
                        ))}

                    </ul>
                </div>
            </Modal>
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
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
};

export default ProductCard;