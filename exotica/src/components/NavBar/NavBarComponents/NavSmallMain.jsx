import React, { useState } from 'react';
import Image from 'next/image';
import { HiOutlineMenu } from "react-icons/hi";
import logo from '../../../../public/Images/logo.png';
import { BsSearch } from 'react-icons/bs';
import { FaBell, FaShoppingCart } from 'react-icons/fa';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { IoClose } from "react-icons/io5";


const NavSmallMain = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const [showSubmenus, setShowSubmenus] = useState(Array(3).fill(false)); // Assuming you have 3 submenu items

    const toggleSubmenu = (index) => {
        const newSubmenus = [...showSubmenus];
        newSubmenus[index] = !newSubmenus[index];
        setShowSubmenus(newSubmenus);
    };

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
                <div className='flex justify-between gap-2 text-xl text-gray-800'>
                    <button><BsSearch /></button>
                    <button><FaBell /></button>
                    <button><FaShoppingCart /></button>
                </div>
            </div>
            <div className={`fixed left-0 top-0 z-50 h-screen w-3/4 bg-pink-50 transition-transform duration-500 ease-in-out ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
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
                        <li className="text-lg text-gray-800 my-2 pb-2 border-b-[1px] border-b-pink-700">
                            <span className='px-1'>
                                Main Menu Item 1
                            </span>
                        </li>
                        <li className="text-lg text-gray-800 my-2 pb-2 cursor-pointer border-b-[1px] border-b-pink-700" onClick={() => toggleSubmenu(0)}>
                            <span className='flex flex-row justify-between w-full items-center px-1'>
                                Main Menu Item 2
                                <span className="ml-1">{showSubmenus[0] ? <MdOutlineKeyboardArrowUp className='text-2xl' /> : <MdOutlineKeyboardArrowDown className='text-2xl' />}</span>
                            </span>
                            {showSubmenus[0] && (
                                <ul className="ml-4">
                                    <li className="text-gray-600">Submenu Item 1</li>
                                    <li className="text-gray-600">Submenu Item 2</li>
                                </ul>
                            )}
                        </li>
                        <li className="text-lg text-gray-800 my-2 pb-2 cursor-pointer border-b-[1px] border-b-pink-700" onClick={() => toggleSubmenu(1)}>
                            <span className='flex flex-row justify-between w-full items-center px-1'>
                                Main Menu Item 3
                                <span className="ml-1">{showSubmenus[1] ? <MdOutlineKeyboardArrowUp className='text-2xl' /> : <MdOutlineKeyboardArrowDown className='text-2xl' />}</span>
                            </span>
                            {showSubmenus[1] && (
                                <ul className="ml-4">
                                    <li className="text-gray-600">Submenu Item 1</li>
                                    <li className="text-gray-600">Submenu Item 2</li>
                                </ul>
                            )}
                        </li>
                        <li className="text-lg text-gray-800 my-2 pb-2 cursor-pointer border-b-[1px] border-b-pink-700" onClick={() => toggleSubmenu(2)}>
                            <span className='flex flex-row justify-between w-full items-center px-1'>
                                Main Menu Item 4
                                <span className="ml-1">{showSubmenus[2] ? <MdOutlineKeyboardArrowUp className='text-2xl' /> : <MdOutlineKeyboardArrowDown className='text-2xl' />}</span>
                            </span>
                            {showSubmenus[2] && (
                                <ul className="ml-4">
                                    <li className="text-gray-600">Submenu Item 1</li>
                                    <li className="text-gray-600">Submenu Item 2</li>
                                </ul>
                            )}
                        </li>
                    </ul>

                </div>
            </div>
            {menuOpen && (
                <div className='fixed left-0 top-0 z-40 h-screen w-screen bg-black opacity-20' onClick={toggleMenu}>
                </div>
            )}
        </div>


    )
}

export default NavSmallMain