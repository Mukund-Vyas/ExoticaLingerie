import React, { useState, useEffect } from 'react';
import { Oval } from 'react-loader-spinner';
import { FcAddressBook, FcBusinesswoman, FcDeleteDatabase, FcLike, FcRating, FcSurvey } from "react-icons/fc";
import { PiUserCircleDuotone } from 'react-icons/pi';
import { TiDeleteOutline } from "react-icons/ti";
import AddAddress from './addAddress';
import { GoArrowLeft } from 'react-icons/go';

function UserProfile() {
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [currentPage, setCurrentPage] = useState('profile');

    const getUserData = async () => {
        const token = localStorage.getItem('authToken');
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_GET_USER_DATA_URL, {
                method: 'GET',
                headers: {
                    'x-auth-token': `${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setUserData(data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteAddress = async (addressId) => {
        const token = localStorage.getItem('authToken');
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_DELETE_ADDRESS_URL}/${addressId}`, {
                method: 'DELETE',
                headers: {
                    'x-auth-token': `${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Update state to remove the deleted address
            setUserData((prevData) => ({
                ...prevData,
                addresses: prevData.addresses.filter(address => address.id !== addressId),
            }));
        } catch (error) {
            console.error('Error deleting address:', error);
        }
    };

    const handleDeleteClick = (addressId) => {
        if (window.confirm('Are you sure you want to delete this address?')) {
            deleteAddress(addressId);
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    const clearAuthToken = () => {
        localStorage.removeItem('authToken');
        // Optionally, redirect or perform other actions
    };

    const updateCurrentPage = (page) => {
        setCurrentPage(page)
    };

    return (
        <>
            {/* Profile Page */}
            {currentPage === 'profile' && (
                <div className='w-full'>
                    {isLoading ? (
                        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
                            <Oval color="#ff197d" secondaryColor="#ffb1d3" height={80} width={80} />
                        </div>
                    ) : (
                        <div>
                            {userData ? (
                                <div>
                                    <div className='flex gap-4 mb-6'>
                                        <PiUserCircleDuotone className='text-6xl text-neutral-600' />
                                        <div className=''>
                                            <h2 className='text-lg font-bold'>{userData.firstName} {userData.lastName}</h2>
                                            <p className='text-xs text-gray-600'>Mobile: {userData.mobile} <br /> Email: {userData.email}</p>
                                        </div>
                                    </div>

                                    <div className='flex gap-4 text-stone-600 mb-4 text-sm'>
                                        <button className='w-full flex justify-between items-center cursor-pointer border rounded-xl border-stone-400 p-2' onClick={() => updateCurrentPage('edit')}>
                                            <div className='flex items-center gap-2 font-serif hover:text-primary'>
                                                <span className='bg-neutral-200 rounded-md p-1'>
                                                    <FcBusinesswoman className='text-xl' />
                                                </span>
                                                <p>
                                                    Edit Profile
                                                </p>
                                            </div>
                                        </button>
                                        <div className='w-full flex justify-between items-center cursor-pointer border rounded-xl border-stone-400 p-2'>
                                            <div className='flex items-center gap-2 font-serif hover:text-primary'>
                                                <span className='bg-neutral-200 rounded-md p-1'>
                                                    <FcRating className='text-xl' />
                                                </span>
                                                <p>
                                                    My Reviews
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex gap-4 text-stone-600 mb- text-sm'>
                                        <div className='w-full flex justify-between items-center cursor-pointer border rounded-xl border-stone-400 p-2'>
                                            <div className='flex items-center gap-2 font-serif hover:text-primary'>
                                                <span className='bg-neutral-200 rounded-md p-1'>
                                                    <FcSurvey className='text-xl' />
                                                </span>
                                                <p>
                                                    Order History
                                                </p>
                                            </div>
                                        </div>
                                        <div className='w-full flex justify-between items-center cursor-pointer border rounded-xl border-stone-400 p-2'>
                                            <div className='flex items-center gap-2 font-serif hover:text-primary'>
                                                <span className='bg-neutral-200 rounded-md p-1'>
                                                    <FcLike className='text-xl' />
                                                </span>
                                                <p>
                                                    My Wishlist
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='w-full my-8'>
                                        <div className='text-lg flex justify-between'>
                                            <span className='flex gap-1 items-center'>
                                                <FcAddressBook className='text-xl' />
                                                <p className='text-lg font-serif'>My Address Book</p>
                                            </span>
                                            <button className='text-sm text-primary font-medium' onClick={() => updateCurrentPage('address')}>Add New</button>
                                        </div>

                                        <div className=''>
                                            {userData.addresses && userData.addresses.map((address, index) => (
                                                <div key={index} className='w-full min-h-28 bg-zinc-50 flex flex-col justify-center my-2 p-2 border border-pink-200 text-sm'>
                                                    <span className='font-medium flex justify-between'>
                                                        {address.firstName} {address.lastName}
                                                        <button onClick={() => handleDeleteClick(address.id)}>
                                                            <TiDeleteOutline />
                                                        </button>
                                                    </span>
                                                    <span className='text-wrap'>{address.street}</span>
                                                    <span>{address.city}, {address.state} - {address.pinCode}</span>
                                                    <span>{address.country}</span>
                                                    <span className='font-medium'>Contact No: {address.mobile}</span>

                                                </div>
                                            ))}

                                            {!userData.addresses.length && (
                                                <div className='w-full h-28 bg-zinc-50 flex flex-col justify-center items-center my-2 p-2 border border-pink-200'>
                                                    <p>No address found</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className='border rounded-xl border-stone-400 py-4'>
                                        <div className='flex flex-col gap-3 p-5 text-pretty font-serif text-stone-600'>
                                            <span className='hover:text-primary'>FAQs</span>
                                            <span className='hover:text-primary'>Contact Us</span>
                                            <span className='hover:text-primary'>About Us</span>
                                            <span className='hover:text-primary'>Return Policy</span>
                                            <span className='hover:text-primary'>Privacy Policy</span>
                                            <span className='hover:text-primary'>Terms of Use</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-2 text-center items-center py-4">
                                    <FcDeleteDatabase className='text-7xl' />
                                    <h2 className="text-xl font-bold mb-2">Oops! This isn't your profile...</h2>
                                    <p className="text-gray-600">We couldn't find the details you're looking for. Perhaps you need to log in or check your credentials?</p>
                                    <button className="text-primary font-semibold cursor-pointer mt-4" onClick={clearAuthToken}>Log in Again</button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Add new Address */}
            {currentPage === 'address' && (
                <div className='w-full flex flex-col gap-2'>
                    <button className='flex items-center gap-2 left-2 top-2 text-lg text-primary font-bold' onClick={() => updateCurrentPage('profile')}>
                        <GoArrowLeft />
                        <span className='text-xs'>
                            Continue Shopping
                        </span>
                    </button>
                    <div className='w-full'>
                        <AddAddress />
                    </div>
                </div>
            )}
        </>
    );
}

export default UserProfile;