import Image from 'next/image'
import React, { useState } from 'react'
import logo from '../../../../public/Images/logo.webp'
import { BsSearch, BsFillHeartFill } from "react-icons/bs"
import { FaUser, FaBell, FaShoppingCart } from "react-icons/fa"
import { GoArrowLeft } from "react-icons/go"
import CartLayout from '../../Cart/CartLayout'
import notificationSnooz from '../../../../public/Images/notifications-snooz.jpg'
import Tooltip from '../../common/Tooltip'
import { GiShoppingCart } from "react-icons/gi";
import { useCart } from '@/src/contexts/CartContext';
import { SlUserFemale } from "react-icons/sl";
import ProfileLayout from '../../Profile/ProfileLayout'
import { useDispatch, useSelector } from 'react-redux'
import { setProfileOpen } from '@/Redux/Reducers/profileSlice'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'
import { setCartOpen } from '@/Redux/Reducers/cartSlice'


const NavMain = () => {
    // const [cartOpen, setCartOpen] = useState(false);
    const [notificationOpen, setNotificationOpen] = useState(false);
    const { state } = useCart(); // Access cart state
    const dispatch = useDispatch();
    const {profileOpen} = useSelector((state) => state.profile);
    const {cartOpen} = useSelector((state) => state.cart);
    const { authToken } = useSelector((state) => state.user);
    const authdispatch = useDispatch();
    const cartDispatch = useDispatch();

    const toggleCart = () => {
        cartDispatch(setCartOpen({isOpen: !cartOpen}));
    };

    const toggleNotification = () => {
        setNotificationOpen(!notificationOpen);
    };

    const toggleProfile = () => {
        dispatch(setProfileOpen({isOpen: !profileOpen}));
    };

    // Calculate the total number of items in the cart
    const cartItemCount = state.cart.reduce((count, item) => count + item.quantity, 0);

    const handleWishlistClick = () => {
        console.log("this runs");
        
        authdispatch(setProfileOpen({ isOpen: !profileOpen }));
        toast.error("please login to view your wishlist..!");
    }
    return (
        <div className='relative'>
            <div className='flex items-center justify-between w-full h-[80px] bg-pink-50 text-center px-24'>
                <Link href={"/"} className='flex gap-3 items-end'>
                    <div className='flex items-center justify-center'>
                        <Image
                            src={logo}
                            alt='logo'
                            height={0}
                            width={0}
                            style={{ width: '100px', height: "auto" }}
                        />
                    </div>
                    <div>
                        <p className=" text-right m-0 text-[26px] leading-[95%] text-black font-light font-Abri pb-2 pl-2 t1">
                            Lingerie <br />
                            <font className="text-[46px] t2">E</font>
                            <font className="text-[38px] t2">XOTICA</font>
                        </p>
                    </div>
                </Link>
                <div className='flex-1'>
                    <div className="flex justify-start items-center relative px-12">
                        <input
                            type="text"
                            className="w-full border-[1px] border-[#3b3b3b] pl-[30px] py-[5px] pr-[5px] text-sm rounded-full outline-none bg-pink-50 focus:bg-white focus:text-gray-700"
                            name="searchTerm"
                            placeholder="Search"
                        />

                        <button type="submit" className="absolute right-16 text-lg">
                            <BsSearch />
                        </button>
                    </div>
                </div>
                <div>
                    <button className='px-8 border-[1px] border-[#3b3b3b] rounded-full text-primary font-bold py-1'>
                        Find Your Fit
                    </button>
                </div>
                <div className='flex items-end justify-between gap-4 pl-12'>
                    <button className='text-gray-800 relative' onClick={toggleProfile}>
                        <Tooltip content="Profile">
                            <FaUser className='text-xl'/>
                        </Tooltip>
                    </button>
                    <button className='text-gray-800 relative' onClick={toggleNotification}>
                        <Tooltip content="Notifications">
                            <FaBell className='text-xl' />
                        </Tooltip>
                    </button>
                    <div className="text-gray-800 relative">
                        {authToken ? (
                            <Link href={"/wishlist"}>
                                <Tooltip content="Wishlist">
                                    <BsFillHeartFill className='text-xl' />
                                </Tooltip>
                            </Link>
                        ) : (
                            <button onClick={() => handleWishlistClick()}>
                                <Tooltip content="Wishlist">
                                    <BsFillHeartFill className='text-xl' />
                                </Tooltip>
                            </button>
                        )}
                        </div>

                    <button className='text-gray-800 relative' onClick={toggleCart}>
                        <Tooltip content="Cart">
                            <FaShoppingCart className='text-xl' />
                        </Tooltip>
                        {cartItemCount > 0 && (
                            <span className='absolute -top-3 -right-3 bg-primary text-white rounded-full w-3.5 h-3.5 flex items-center justify-center text-xs font-semibold'>
                                {cartItemCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Shopping cart popup dialog */}
            <div className={`fixed right-0 top-0 z-50 h-screen w-1/3 bg-pink-50 transition-transform duration-500 ease-in-out ${cartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div id='cart-header' className='shadow-md py-2'>
                    <div className='flex w-full items-center mb-2 px-2'>
                        <button className='flex items-center gap-2 left-2 top-2 text-lg text-primary font-bold' onClick={toggleCart}>
                            <GoArrowLeft />
                            <span className='text-xs'>
                                Continue Shopping
                            </span>
                        </button>
                    </div>

                    <div className='flex px-6 justify-between items-center'>
                        <span className='flex items-center gap-1 font-serif font-semibold text-xl'><GiShoppingCart className='text-2xl' /> My Cart</span>

                        <button className='font-mono px-4 py-1 border border-primary rounded-2xl text-pretty text-primary font-semibold'>
                            Wishlist
                        </button>
                    </div>
                </div>

                <div id='cart-main' className='h-full'>
                    <CartLayout toggleCart = {toggleCart}/>
                </div>
            </div>
            {cartOpen && (
                <button className='fixed left-0 top-0 z-40 h-screen w-screen bg-black opacity-40 cursor-default' onClick={toggleCart}>
                </button>
            )}

            {/* Notification popup dialog */}
            <div className={`fixed right-0 top-0 z-50 h-screen w-1/4 bg-pink-50 transition-transform duration-500 ease-in-out ${notificationOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div id='notification-header' className='shadow-md py-2'>
                    <div className='flex w-full items-center mb-2 px-2'>
                        <button className='flex items-center gap-2 left-2 top-2 text-lg text-primary font-bold' onClick={toggleNotification}>
                            <GoArrowLeft />
                            <span className='text-xs'>
                                go back
                            </span>
                        </button>
                    </div>

                    <div className='flex px-6 justify-between items-center'>
                        <span className='font-serif font-semibold text-xl'>My Notifications</span>
                    </div>
                </div>

                <div className='h-full'>
                    <div className='relative h-full bg-gray-300 bg-opacity-45'>
                        {/* Cart Body */}
                        <div className='h-full overflow-scroll scrollbar pb-48'>
                            {/* when cart is Empty */}
                            <div className='flex flex-col items-center justify-center h-full p-10'>
                                <Image src={notificationSnooz} alt='Empty Cart' width={200} height={200} />
                                <p className='text-lg font-semibold text-center pt-10'>We're on snooze here!</p>
                                <p className='text-sm text-gray-600 text-center mb-4'>We don't have new updates for you. Continue shopping to receive personalized messages.</p>
                                <button className="bg-primary hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded">
                                    Let's go Shopping
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {notificationOpen && (
                <button className='fixed left-0 top-0 z-40 h-screen w-screen bg-black opacity-40' onClick={toggleNotification}>
                </button>
            )}

            {/* Profile popup dialog */}
            <div className={`fixed right-0 top-0 z-50 h-screen w-1/4 bg-pink-50 transition-transform duration-500 ease-in-out ${profileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div id='profile-header' className='shadow-md py-2'>
                    <div className='flex w-full items-center mb-2 px-2'>
                        <button className='flex items-center gap-2 left-2 top-2 text-lg text-primary font-bold' onClick={toggleProfile}>
                            <GoArrowLeft />
                            <span className='text-xs'>
                                Close
                            </span>
                        </button>
                    </div>
                    <div className='flex px-6 justify-between items-center'>
                        <span className='flex items-center gap-1 font-serif font-semibold text-xl'><SlUserFemale className='text-lg' /> Profile</span>
                    </div>
                </div>

                <div id='profile-main' className='h-full'>
                    <ProfileLayout toggleProfile = {toggleProfile}/>
                </div>
            </div>
            {profileOpen && (
                <button className='fixed left-0 top-0 z-40 h-screen w-screen bg-black opacity-40' onClick={toggleProfile}>
                </button>
            )}
        </div>
    )
}

export default NavMain;
