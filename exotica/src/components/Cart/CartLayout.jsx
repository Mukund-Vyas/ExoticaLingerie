import React from 'react';
import Image from 'next/image';
import { useCart } from '@/src/contexts/CartContext';
import CartItem from './CartComponents/CartItem';
import emptyCartImage from '../../../public/Images/Empty-Cart.png';
import { HiOutlineTrash } from "react-icons/hi2";
import { LiaQuestionCircleSolid } from "react-icons/lia";
import Tooltip from '../common/Tooltip';
import { toast } from 'react-hot-toast';
import { FiTrash2 } from "react-icons/fi";
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setCartOpen } from '@/Redux/Reducers/cartSlice';

const CartLayout = ({ toggleCart }) => {
    const { state, dispatch } = useCart();
    const cartIsEmpty = state.cart.length === 0;
    const router = useRouter();
    const cartDispatch = useDispatch();

    const handleSelectItem = (item) => {
        dispatch({ type: 'SELECT_ITEM', payload: item });
    };

    const handleSelectAll = () => {
        dispatch({ type: 'SELECT_ALL_ITEMS' });
    };

    const handleRemoveSelectedItems = () => {
        if (window.confirm('Are you sure you want to remove selected item from cart?')){
            const itemsRemoved = state.selectedItems.length;
            state.selectedItems.forEach(item => {
                dispatch({ type: 'REMOVE_FROM_CART', payload: item });
            });

            toast(`Removed ${itemsRemoved} item${itemsRemoved > 1 ? 's' : ''} from cart.`, {
                style: {
                    border: '1px solid #ff197d',
                    padding: '16px',
                },
                icon: <FiTrash2 color='rgb(225 29 72)' />,
            });
        }
    };

    const getTotalPrice = (items) => {
        return items.reduce((total, item) => total + item.discountedPrice * item.quantity, 0).toFixed(2);
    };

    const handleRemoveFromCart = (item) => {
        if (window.confirm('Are you sure you want to remove item from cart?')){
            dispatch({ type: 'REMOVE_FROM_CART', payload: item });

            toast('Removed 1 item from cart.', {
                style: {
                    border: '1px solid #ff197d',
                    padding: '16px',
                },
                icon: <FiTrash2 color='rgb(225 29 72)' />,
            });
        }
    };

    const handleQuantityChange = (item, quantity) => {
        if (quantity < 1 || quantity > 12) return;
        dispatch({ type: 'UPDATE_QUANTITY', payload: { ...item, quantity } });
    };
    
    const calculateSavings = () => {
        const totalMRP = state.selectedItems.reduce((total, item) => total + item.price * item.quantity, 0);
        const savings = totalMRP - getTotalPrice(state.selectedItems);
        
        return { totalMRP, savings, savingPercent: totalMRP ? (savings / totalMRP) * 100 : 0 };
    };

    const paymentDetails = calculateSavings();
    const totalPrice = parseFloat(getTotalPrice(state.selectedItems));
    const shippingCharge = totalPrice > 999 ? 0 : 49;
    const convenienceCharge = 2;
    const orderTotal = totalPrice + shippingCharge + convenienceCharge;

    const handleGotoProductsClick = () => {
        toggleCart();
    }

    const handleCheckoutClick = async () => {
        cartDispatch(setCartOpen(false));
        router .push('/checkout');
        // toast('We apologize for the inconvenience, but we are currently unable to process your order. Please try again later or contact our support team for assistance.', {
        //     icon: <div><BsExclamationLg className='text-6xl bg-rose-100 border border-neutral-600 rounded-full p-2' /></div>,
        //     duration: 6000,
        // })
    }
    
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
                        <Link href="/products" passHref onClick={() => handleGotoProductsClick()}>
                            <button className="bg-primary hover:bg-pink-600 text-white font-medium py-2 px-4 rounded">
                                Let's go Shopping
                            </button>
                        </Link>
                    </div>
                ) : (
                    /* When cart has items */
                    <div className='flex flex-col gap-2'>
                        <div className='flex justify-between items-center py-4 px-2 bg-white'>
                            <div className='flex items-center'>
                                <input
                                    type="checkbox"
                                    checked={state.selectedItems.length > 0}
                                    onChange={handleSelectAll}
                                    className='h-4 w-4 accent-rose-500'
                                />
                                <span className='ml-2'>
                                    {state.selectedItems.length}/{state.cart.length} items selected
                                </span>
                            </div>
                            <button
                                onClick={handleRemoveSelectedItems}
                                className='text-xl text-primary hover:text-red-700'
                                disabled={state.selectedItems.length === 0}
                                title="remove from cart"
                            >
                                <HiOutlineTrash />
                            </button>
                        </div>
                        <div className='flex flex-col p-2 bg-white gap-2'>
                            {state.cart.map((item) => (
                                <CartItem
                                    key={"cart-item-" + item._id + item.color}
                                    item={item}
                                    onRemove={handleRemoveFromCart}
                                    onUpdateQuantity={handleQuantityChange}
                                    isSelected={state.selectedItems.some(selectedItem => selectedItem._id === item._id && selectedItem.size === item.size)}
                                    onSelect={handleSelectItem}
                                />
                            ))}
                        </div>
                        <div className='flex flex-col w-full text-sm mt-4 gap-2 bg-white p-4'>
                            <p className='font-mono text-xl'>PRICE DETAILS</p>
                            <p className='flex justify-between px-1 font-sans'><span>Total M.R.P :</span> ₹{state.selectedItems.length > 0 ? paymentDetails.totalMRP.toFixed(2) : '0.00'}</p>
                            {state.selectedItems.length > 0 && (
                                <>
                                    <p className='flex justify-between px-1 font-sans'><span>Savings on M.R.P :</span> <span className='text-rose-600'>- ₹{paymentDetails.savings.toFixed(2)}</span></p>
                                    <p className='flex justify-between px-1 font-sans'><span>Saving % :</span> <span className='text-green-600'>{paymentDetails.savingPercent.toFixed(1)}% off</span></p>
                                    <p className='flex justify-between px-1 font-sans'><span>Sub-total :</span> ₹{getTotalPrice(state.selectedItems)}</p>
                                    <div className='flex justify-between px-1 font-sans'>
                                        <span className='flex items-center gap-1'>
                                            Shipping charges
                                            <Tooltip content="Order above ₹999 to avail free shipping">
                                                <LiaQuestionCircleSolid />
                                            </Tooltip>
                                            :
                                        </span>
                                        ₹{shippingCharge.toFixed(2)}
                                    </div>
                                    <div className='flex justify-between px-1 font-sans'>
                                        <span className='flex items-center gap-1'>
                                            Convenience charges
                                            <Tooltip content="Applied for platform upkeep and support.">
                                                <LiaQuestionCircleSolid />
                                            </Tooltip>
                                            :
                                        </span>
                                        ₹{convenienceCharge.toFixed(2)}
                                    </div>
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
                            <p className='font-mono'>₹{state.selectedItems.length > 0 ? orderTotal.toFixed(2) : '0.00'}</p>
                        </span>

                        {/* Net Payable Amount */}
                        <span className='flex w-full items-center justify-between px-4 text-sm text-primary'>
                            <p className='font-serif'>Net Payable</p>
                            <p className='font-mono'>₹{state.selectedItems.length > 0 ? orderTotal.toFixed(2) : '0.00'}</p>
                        </span>
                    </div>
                    <button
                        className='py-3 w-full bg-primary hover:bg-pink-600 text-white font-mono font-semibold text-lg'
                        disabled={state.selectedItems.length === 0}
                        onClick={() => handleCheckoutClick()}
                    >
                        Continue to Checkout
                    </button>
                </div>
            )}
        </div>
    );
};

CartLayout.propTypes = {
    toggleCart: PropTypes.func.isRequired,
};
export default CartLayout;