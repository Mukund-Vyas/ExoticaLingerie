import React, { useState } from 'react';
import Image from 'next/image';
import { HiOutlineMenu } from "react-icons/hi";
import logo from '../../../../public/Images/logo.png';
import { BsSearch } from 'react-icons/bs';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import Tooltip from '../../common/Tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { setProfileOpen } from '@/Redux/Reducers/profileSlice';
import { GoArrowLeft } from 'react-icons/go';
import { SlUserFemale } from 'react-icons/sl';
import ProfileLayout from '../../Profile/ProfileLayout';
import { useCart } from '@/src/contexts/CartContext';
import CartLayout from '../../Cart/CartLayout';
import { GiShoppingCart } from 'react-icons/gi';
import Link from 'next/link';


const NavSmallMain = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { profileOpen } = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const [cartOpen, setCartOpen] = useState(false);
    const { cart } = useCart();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const [showSubmenus, setShowSubmenus] = useState(Array(5).fill(false)); // Assuming you have 3 submenu items

    const toggleSubmenu = (index) => {
        const newSubmenus = [...showSubmenus];
        newSubmenus[index] = !newSubmenus[index];
        setShowSubmenus(newSubmenus);
    };

    const toggleProfile = () => {
        dispatch(setProfileOpen({ isOpen: !profileOpen }));
    };

    const toggleCart = () => {
        setCartOpen(!cartOpen);
    };

    // Calculate the total number of items in the cart
    const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);
    return (
        <div className='relative'>
            <div className='flex gap-2 w-full bg-pink-50 h-[60px] px-3 items-center justify-between'>
                <button className='text-2xl text-gray-800' onClick={toggleMenu}><HiOutlineMenu /></button>
                <div className='flex-1'>
                    <Image
                        src={logo}
                        alt='logo'
                        height={0}
                        width={0}
                        style={{ width: '55px', height: "auto" }}
                    />
                </div>
                <div className='flex justify-between items-center gap-3 text-xl text-gray-800 pr-2' >
                    <button><BsSearch className='text-xl' /></button>
                    <button className='text-gray-800 relative' onClick={toggleProfile}>
                        <Tooltip content="Profile">
                            <FaUser className='text-xl' />
                        </Tooltip>
                    </button>
                    <button className='text-gray-800 relative' onClick={toggleCart}>
                        <Tooltip content="Cart">
                            <FaShoppingCart className='text-[22px]' />
                        </Tooltip>
                        {cartItemCount > 0 && (
                            <span className='absolute -top-3 -right-3 bg-primary text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-semibold'>
                                {cartItemCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Menu */}
            <div className={`fixed left-0 top-0 z-50 h-screen w-full bg-pink-50 transition-transform duration-500 ease-in-out ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <button className='absolute right-2 top-2 text-2xl text-gray-800' onClick={toggleMenu}><IoClose /></button>

                <div className='w-full flex justify-center items-center my-8'>
                    <Image
                        src={logo}
                        alt='logo'
                        height={0}
                        width={0}
                        style={{ width: '100px', height: "auto" }}
                    />
                </div>

                <div className='w-full px-4 h-full overflow-scroll'>
                    <ul className="text-lg">
                        {/* <Link href={"/products"}>
                            <li className="text-lg text-gray-800 my-2 pb-2 border-b-[1px] border-b-pink-700">
                                <span className='px-1'>
                                    Main Menu Item 1
                                </span>
                            </li>
                        </Link> */}
                        <li className="text-lg text-gray-800 my-2 pb-2 cursor-pointer border-b-[1px] border-b-pink-700" onClick={() => toggleSubmenu(0)}>
                            <Link href={"products"}>
                                <span className='flex flex-row justify-between w-full items-center px-1'>
                                    New Arrivals
                                    <span className="ml-1">{showSubmenus[0] ? <MdOutlineKeyboardArrowUp className='text-2xl' /> : <MdOutlineKeyboardArrowDown className='text-2xl' />}</span>
                                </span>
                            </Link>
                            {showSubmenus[0] && (
                                <ul className="ml-4">
                                    <li><Link href={"/products"} className='hover:text-primary'>Bras</Link></li>
                                    <li><Link href={"/products"} className='hover:text-primary'>Activewear</Link></li>
                                    <li><Link href={"/products"} className='hover:text-primary'>Panties</Link></li>
                                    <li><Link href={"/products"} className='hover:text-primary'>Shapewear</Link></li>
                                </ul>
                            )}
                        </li>
                        <li className="text-lg text-gray-800 my-2 pb-2 cursor-pointer border-b-[1px] border-b-pink-700" onClick={() => toggleSubmenu(1)}>
                            <Link href={"products"}>
                                <span className='flex flex-row justify-between w-full items-center px-1'>
                                    Bras
                                    <span className="ml-1">{showSubmenus[0] ? <MdOutlineKeyboardArrowUp className='text-2xl' /> : <MdOutlineKeyboardArrowDown className='text-2xl' />}</span>
                                </span>
                            </Link>
                            {showSubmenus[1] && (
                                <ul className="ml-4">
                                    <li><Link href={"/products"} className='hover:text-primary'>Bridal Bras</Link></li>
                                    <li><Link href={"/products"} className='hover:text-primary'>Wired Bras</Link></li>
                                    <li><Link href={"/products"} className='hover:text-primary'>non-Wired Bras</Link></li>
                                    <li><Link href={"/products"} className='hover:text-primary'>Padded Bras</Link></li>
                                    <li><Link href={"/products"} className='hover:text-primary'>non-Padded Bras</Link></li>
                                </ul>
                            )}
                        </li>
                        <li className="text-lg text-gray-800 my-2 pb-2 cursor-pointer border-b-[1px] border-b-pink-700" onClick={() => toggleSubmenu(2)}>
                            <Link href={"products"}>
                                <span className='flex flex-row justify-between w-full items-center px-1'>
                                    Activewear
                                    <span className="ml-1">{showSubmenus[0] ? <MdOutlineKeyboardArrowUp className='text-2xl' /> : <MdOutlineKeyboardArrowDown className='text-2xl' />}</span>
                                </span>
                            </Link>
                            {showSubmenus[2] && (
                                <ul className="ml-4">
                                    <li><Link href={"/products"} className='hover:text-primary'>Sports wear</Link></li>
                                    <li><Link href={"/products"} className='hover:text-primary'>Gym wear</Link></li>
                                    <li><Link href={"/products"} className='hover:text-primary'>Yoga wear</Link></li>
                                    <li><Link href={"/products"} className='hover:text-primary'>Running & Walking wear</Link></li>
                                </ul>
                            )}
                        </li>
                        <li className="text-lg text-gray-800 my-2 pb-2 cursor-pointer border-b-[1px] border-b-pink-700" onClick={() => toggleSubmenu(3)}>
                            <Link href={"products"}>
                                <span className='flex flex-row justify-between w-full items-center px-1'>
                                    Panties
                                    <span className="ml-1">{showSubmenus[0] ? <MdOutlineKeyboardArrowUp className='text-2xl' /> : <MdOutlineKeyboardArrowDown className='text-2xl' />}</span>
                                </span>
                            </Link>
                            {showSubmenus[3] && (
                                <ul className="ml-4">
                                    <li><Link href={"/products"} className='hover:text-primary'>Seamless Panties</Link></li>
                                    <li><Link href={"/products"} className='hover:text-primary'>Shaper Panties</Link></li>
                                    <li><Link href={"/products"} className='hover:text-primary'>Pack of 2</Link></li>
                                    <li><Link href={"/products"} className='hover:text-primary'>Pack of 4</Link></li>
                                </ul>
                            )}
                        </li>
                        <Link href={"/products"}>
                            <li className="text-lg text-gray-800 my-2 pb-2 border-b-[1px] border-b-pink-700">
                                <span className='px-1'>
                                    Lingerie Set
                                </span>
                            </li>
                        </Link>
                        <Link href={"/products"}>
                            <li className="text-lg text-gray-800 my-2 pb-2 border-b-[1px] border-b-pink-700">
                                <span className='px-1'>
                                    Shapewear
                                </span>
                            </li>
                        </Link>
                        <li className="text-lg text-gray-800 my-2 pb-2 cursor-pointer border-b-[1px] border-b-pink-700" onClick={() => toggleSubmenu(4)}>
                            <Link href={"products"}>
                                <span className='flex flex-row justify-between w-full items-center px-1'>
                                    Offre ZOne
                                    <span className="ml-1">{showSubmenus[0] ? <MdOutlineKeyboardArrowUp className='text-2xl' /> : <MdOutlineKeyboardArrowDown className='text-2xl' />}</span>
                                </span>
                            </Link>
                            {showSubmenus[4] && (
                                <ul className="ml-4">
                                    <li><Link href={"/products"} className='hover:text-primary'>Flat 10% off</Link></li>
                                    <li><Link href={"/products"} className='hover:text-primary'>Flat 15% off</Link></li>
                                    <li><Link href={"/products"} className='hover:text-primary'>Flat 20% off</Link></li>
                                    <li><Link href={"/products"} className='hover:text-primary'>Flat 40% off</Link></li>
                                </ul>
                            )}
                        </li>
                    </ul>

                </div>
            </div>
            {menuOpen && (
                <button className='fixed left-0 top-0 z-40 h-screen w-screen bg-black opacity-20' onClick={toggleMenu}>
                </button>
            )}

            {/* Shopping cart popup dialog */}
            <div className={`fixed right-0 top-0 z-50 h-screen w-1/3 max-sm:w-full bg-pink-50 transition-transform duration-500 ease-in-out ${cartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
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
                    <CartLayout toggleCart={toggleCart} />
                </div>
            </div>
            {cartOpen && (
                <button className='fixed left-0 top-0 z-40 h-screen w-screen bg-black opacity-40 cursor-default' onClick={toggleCart}>
                </button>
            )}

            {/* Profile popup dialog */}
            <div className={`fixed right-0 top-0 z-50 h-screen max-sm:w-full bg-pink-50 transition-transform duration-500 ease-in-out ${profileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
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
                    <ProfileLayout toggleProfile={toggleProfile} />
                </div>
            </div>
            {profileOpen && (
                <button className='fixed left-0 top-0 z-40 h-screen w-screen bg-black opacity-40' onClick={toggleProfile}>
                </button>
            )}
        </div>


    )
}

export default NavSmallMain