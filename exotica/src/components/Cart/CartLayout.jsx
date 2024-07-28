import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCart } from '@/src/contexts/CartContext';
import CartItem from './CartComponents/CartItem';
import emptyCartImage from '../../../public/Images/Empty-Cart.png';
import { HiOutlineTrash } from "react-icons/hi2";
import { LiaQuestionCircleSolid } from "react-icons/lia";
import Tooltip from '../common/Tooltip';
import { toast } from 'react-hot-toast';
import { FiTrash2 } from "react-icons/fi";

const CartLayout = () => {
    const { cart, dispatch } = useCart();
    const cartIsEmpty = cart.length === 0;
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        const updateSelectedItems = () => {
            return selectedItems.filter(item => 
                cart.some(cartItem => cartItem._id === item._id && cartItem.size === item.size)
            );
        };

        setSelectedItems(updateSelectedItems());
    }, [cart]);

    const handleSelectItem = (item) => {
        setSelectedItems((prevSelected) => {
            const exists = prevSelected.find(i => i._id === item._id && i.size === item.size);
            if (exists) {
                return prevSelected.filter(i => !(i._id === item._id && i.size === item.size));
            }
            return [...prevSelected, item];
        });
    };

    const handleSelectAll = () => {
        if (selectedItems.length === cart.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(cart);
        }
    };

    const handleRemoveSelectedItems = () => {
        const itemsRemoved = selectedItems.length;
        selectedItems.forEach(item => {
            dispatch({ type: 'REMOVE_FROM_CART', payload: item });
        });
        setSelectedItems([]);

        toast(`Removed ${itemsRemoved} item${itemsRemoved > 1 ? 's' : ''} from cart.`, {
            style: {
                border: '1px solid #ff197d',
                padding: '16px',
            },
            icon: <FiTrash2 color='rgb(225 29 72)' />,
        });
    };

    const getTotalPrice = (items) => {
        return items.reduce((total, item) => total + item.discountedPrice * item.quantity, 0).toFixed(2);
    };

    const handleRemoveFromCart = (item) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: item });

        toast('Removed 1 item from cart.', {
            style: {
                border: '1px solid #ff197d',
                padding: '16px',
            },
            icon: <FiTrash2 color='rgb(225 29 72)' />,
        });
    };

    const handleQuantityChange = (item, quantity) => {
        if (quantity < 1 || quantity > 12) return;
        dispatch({ type: 'UPDATE_QUANTITY', payload: { ...item, quantity } });

        // Update the selected item quantity if it's already selected
        setSelectedItems(prevSelected => {
            return prevSelected.map(i => i._id === item._id && i.size === item.size ? { ...i, quantity } : i);
        });
    };

    const calculateSavings = () => {
        const totalMRP = selectedItems.reduce((total, item) => total + item.price * item.quantity, 0);
        const savings = totalMRP - getTotalPrice(selectedItems);
        return { totalMRP, savings, savingPercent: totalMRP ? (savings / totalMRP) * 100 : 0 };
    };

    const paymentDetails = calculateSavings();
    const totalPrice = parseFloat(getTotalPrice(selectedItems));
    const shippingCharge = totalPrice > 999 ? 0 : 49;
    const convenienceCharge = 2;
    const orderTotal = totalPrice + shippingCharge + convenienceCharge;

    return (
        <div className='relative h-full bg-gray-200 bg-opacity-45'>
            {/* Cart Body */}
            <div className='h-full overflow-scroll scrollbar pb-48'>
                {cartIsEmpty ? (
                    /* When cart is empty */
                    <div className='flex flex-col items-center justify-center h-full p-10'>
                        <Image src={emptyCartImage} alt='Empty Cart' width={200} height={200} />
                        <p className='text-lg font-semibold text-center'>Hey, gorgeous! Let's fill your cart with goodies!</p>
                        <p className='text-sm text-gray-600 text-center mb-4'>Act fast! Shop our exciting offers and elevate your intimates collection today!</p>
                        <button className="bg-primary hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded">
                            Let's go Shopping
                        </button>
                    </div>
                ) : (
                    /* When cart has items */
                    <div className='flex flex-col gap-2'>
                        <div className='flex justify-between items-center py-4 px-2 bg-white'>
                            <div className='flex items-center'>
                                <input
                                    type="checkbox"
                                    checked={selectedItems.length > 0}
                                    onChange={handleSelectAll}
                                    className='h-4 w-4 accent-rose-500'
                                />
                                <span className='ml-2'>
                                    {selectedItems.length}/{cart.length} items selected
                                </span>
                            </div>
                            <button
                                onClick={handleRemoveSelectedItems}
                                className='text-xl text-primary hover:text-red-700'
                                disabled={selectedItems.length === 0}
                            >
                                <HiOutlineTrash />
                            </button>
                        </div>
                        <div className='flex flex-col p-2 bg-white gap-2'>
                            {cart.map((item) => (
                                <CartItem
                                    key={item._id + item.size}
                                    item={item}
                                    onRemove={handleRemoveFromCart}
                                    onUpdateQuantity={handleQuantityChange}
                                    isSelected={selectedItems.some(selectedItem => selectedItem._id === item._id && selectedItem.size === item.size)}
                                    onSelect={handleSelectItem}
                                />
                            ))}
                        </div>
                        <div className='flex flex-col w-full text-sm mt-4 gap-2 bg-white p-4'>
                            <p className='font-mono text-xl'>PRICE DETAILS</p>
                            <p className='flex justify-between px-1 font-sans'><span>Total M.R.P :</span> ₹{selectedItems.length > 0 ? paymentDetails.totalMRP.toFixed(2) : '0.00'}</p>
                            {selectedItems.length > 0 && (
                                <>
                                    <p className='flex justify-between px-1 font-sans'><span>Savings on M.R.P :</span> <span className='text-rose-600'>- ₹{paymentDetails.savings.toFixed(2)}</span></p>
                                    <p className='flex justify-between px-1 font-sans'><span>Saving % :</span> <span className='text-green-600'>{paymentDetails.savingPercent.toFixed(1)}% off</span></p>
                                    <p className='flex justify-between px-1 font-sans'><span>Sub-total :</span> ₹{getTotalPrice(selectedItems)}</p>
                                    <p className='flex justify-between px-1 font-sans'>
                                        <span className='flex items-center gap-1'>
                                            Shipping charges
                                            <Tooltip content="Order above ₹999 to avail free shipping">
                                                <LiaQuestionCircleSolid />
                                            </Tooltip>
                                            :
                                        </span>
                                        ₹{shippingCharge.toFixed(2)}
                                    </p>
                                    <p className='flex justify-between px-1 font-sans'>
                                        <span className='flex items-center gap-1'>
                                            Convenience charges
                                            <Tooltip content="Applied for platform upkeep and support.">
                                                <LiaQuestionCircleSolid />
                                            </Tooltip>
                                            :
                                        </span>
                                        ₹{convenienceCharge.toFixed(2)}
                                    </p>
                                    <p className='flex justify-between px-1 font-sans'><span>Order total :</span> ₹{orderTotal.toFixed(2)}</p>
                                    <p className='flex justify-between px-1 font-sans border-t-2 pt-1'><span>Net Payable :</span> <span className='text-rose-600'>₹{orderTotal.toFixed(2)}</span></p>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {!cartIsEmpty && (
                <div className='absolute bottom-[4.5rem] h-auto w-full bg-pink-50'>
                    <div className='flex flex-col w-full py-1.5'>
                        {/* Order Total Label */}
                        <span className='flex w-full items-center justify-between px-4 text-lg'>
                            <p className='font-serif'>Order Total</p>
                            <p className='font-mono'>₹{selectedItems.length > 0 ? orderTotal.toFixed(2) : '0.00'}</p>
                        </span>

                        {/* Net Payable Amount */}
                        <span className='flex w-full items-center justify-between px-4 text-sm text-primary'>
                            <p className='font-serif'>Net Payable</p>
                            <p className='font-mono'>₹{selectedItems.length > 0 ? orderTotal.toFixed(2) : '0.00'}</p>
                        </span>
                    </div>
                    <button
                        className='py-3 w-full bg-primary hover:bg-pink-600 text-white font-mono font-semibold text-lg'
                        disabled={selectedItems.length === 0}
                    >
                        Continue to Checkout
                    </button>
                </div>
            )}
        </div>
    );
};

export default CartLayout;