import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { HiOutlineTrash } from "react-icons/hi2";
import axios from 'axios';

const CartItem = ({ item, onRemove, onUpdateQuantity, isSelected, onSelect }) => {
    const handleQuantityChange = (quantity) => {
        onUpdateQuantity(item, quantity);
    };

    return (
        <div className='relative flex w-full items-start border-b p-2 border border-gray-400 h-fit rounded-sm bg-white'>
            <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onSelect(item)}
                className='absolute top-2 left-2 h-4 w-4 accent-rose-500'
            />
            <img src={process.env.NEXT_PUBLIC_Image_URL + "/"+ item.variation.imageUrls[0]  } alt={item.productname} className='w-24 rounded-md ml-4' />
            <div className='flex-grow ml-4'>
                <div className='flex justify-between items-start'>
                    <div>
                        <h2 className='font-semibold'>{item.brandname} - {item.productname}</h2>
                        <p className='text-sm text-gray-500'>Size: {item.size}</p>
                        <p className='text-sm text-gray-500'>Unit Price: ₹{item.discountedPrice.toFixed(2)}</p>
                        <p className='text-sm text-gray-500'>Color: {item.variation.color}</p>
                    </div>
                    <button onClick={() => onRemove(item)} className='text-xl text-primary hover:text-red-700' title="remove from cart">
                        <HiOutlineTrash />
                    </button>
                </div>
                <div className='flex justify-between items-end mt-4'>
                    <div className='flex items-center'>
                        <button
                            className='px-2 py-1 border rounded-l-md'
                            onClick={() => handleQuantityChange(item.quantity - 1)}
                        >
                            -
                        </button>
                        <span className='px-4 py-1 border-t border-b'>{item.quantity}</span>
                        <button
                            className='px-2 py-1 border rounded-r-md'
                            onClick={() => handleQuantityChange(item.quantity + 1)}
                        >
                            +
                        </button>
                    </div>
                    <p className='font-semibold'>₹{(item.discountedPrice * item.quantity).toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
};

CartItem.propTypes = {
    item: PropTypes.shape({
        brandname: PropTypes.string.isRequired,
        productname: PropTypes.string.isRequired,
        size: PropTypes.string.isRequired,
        discountedPrice: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
        variation: PropTypes.shape({
            color: PropTypes.string.isRequired,
            imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
        }).isRequired,
    }).isRequired,
    onRemove: PropTypes.func.isRequired,
    onUpdateQuantity: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired,
};

export default CartItem;
