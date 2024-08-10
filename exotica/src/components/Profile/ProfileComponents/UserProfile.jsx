import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Oval } from 'react-loader-spinner';
import { FcAddressBook, FcBusinesswoman, FcDeleteDatabase, FcLike, FcRating, FcSurvey } from "react-icons/fc";
import { PiUserCircleDuotone } from 'react-icons/pi';
import AddAddress from './AddAddress';
import { GoArrowLeft } from 'react-icons/go';
import { MdDeleteForever } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import EditProfile from './EditProfile';
import OrderHistory from './OrderHistory';
import UserReviews from './UserReviews';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/Redux/Reducers/userSlice';
import { redirect } from 'next/navigation';
import { setProfileOpen } from '@/Redux/Reducers/profileSlice';
import Link from 'next/link';

function UserProfile({ gotoLogin, toggleProfile }) {
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [currentPage, setCurrentPage] = useState('profile');
    const [userSubset, setUserSubset] = useState(null);
    const dispatch = useDispatch();
    const { authToken } = useSelector((state) => state.user);
    const {profileOpen} = useSelector((state) => state.profile)

    const refreshAuthToken = async () => {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_REFRESH_TOKEN, {
                method: 'POST',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to refresh token');
            }

            const data = await response.json();
            localStorage.setItem('authToken', data.accessToken);
            return data.accessToken;
        } catch (error) {
            console.error('Error refreshing token:', error);
            clearAuthToken();
            return null;
        }
    };

    const getUserData = async () => {;
        try {
            let response = await fetch(process.env.NEXT_PUBLIC_GET_USER_DATA_URL, {
                method: 'GET',
                headers: {
                    'x-auth-token': `${authToken}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 401) {
                token = await refreshAuthToken();
                if (token) {
                    response = await fetch(process.env.NEXT_PUBLIC_GET_USER_DATA_URL, {
                        method: 'GET',
                        headers: {
                            'x-auth-token': `${token}`,
                            'Content-Type': 'application/json',
                        },
                    });
                } else {
                    throw new Error('Unable to refresh token');
                }
            }

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
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/addresses/${addressId}`, {
                method: 'DELETE',
                headers: {
                    'x-auth-token': authToken,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const updatedUser = await response.json(); // Assuming backend returns updated user data
            setUserData(updatedUser);
        } catch (error) {
            console.error('Error deleting address:', error);
        }
    };

    const handleDeleteClick = (addressId) => {
        if (window.confirm('Are you sure you want to delete this address?')) {
            deleteAddress(addressId);
        }
    };

    const updateUserSubset = (user) => {
        if (user) {
            const userSubset = {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                mobile: user.mobile,
                email: user.email,
            };

            setUserSubset(userSubset);
        }
    }

    useEffect(() => {
        getUserData();
    }, [currentPage]);

    useEffect(() => {
        updateUserSubset(userData);
    }, [userData]);

    const clearAuthToken = () => {
        dispatch(logout());
        gotoLogin('initial');
    };

    const updateCurrentPage = (page) => {
        if(page === "wishlist"){
            if(authToken){
                redirect('/wishlist')
            }
        }
        else{
            setCurrentPage(page);
        }
    };

    const handleWishlistClick = () =>{
        dispatch(setProfileOpen({ isOpen: !profileOpen }))
    }
    return (
        <>
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
                                                <p>Edit Profile</p>
                                            </div>
                                        </button>
                                        <Link href={'/wishlist'} className='w-full flex justify-between items-center cursor-pointer border rounded-xl border-stone-400 p-2' onClick={() => handleWishlistClick()}>
                                            <div className='flex items-center gap-2 font-serif hover:text-primary'>
                                                <span className='bg-neutral-200 rounded-md p-1'>
                                                    <FcLike className='text-xl' />
                                                </span>
                                                <p>My Wishlist</p>
                                            </div>
                                        </Link>
                                    </div>

                                    <div className='flex gap-4 text-stone-600 mb- text-sm'>
                                        <button className='w-full flex justify-between items-center cursor-pointer border rounded-xl border-stone-400 p-2' onClick={() => updateCurrentPage('orders')}>
                                            <div className='flex items-center gap-2 font-serif hover:text-primary'>
                                                <span className='bg-neutral-200 rounded-md p-1'>
                                                    <FcSurvey className='text-xl' />
                                                </span>
                                                <p>Order History</p>
                                            </div>
                                        </button>
                                        <button className='w-full flex justify-between items-center cursor-pointer border rounded-xl border-stone-400 p-2' onClick={() => updateCurrentPage('reviews')}>
                                            <div className='flex items-center gap-2 font-serif hover:text-primary'>
                                                <span className='bg-neutral-200 rounded-md p-1'>
                                                    <FcRating className='text-xl' />
                                                </span>
                                                <p>My Reviews</p>
                                            </div>
                                        </button>
                                    </div>

                                    <div className='w-full my-8'>
                                        <div className='text-lg flex justify-between'>
                                            <span className='flex gap-1 items-center'>
                                                <FcAddressBook className='text-xl' />
                                                <p className='text-lg font-serif'>My Address Book</p>
                                            </span>
                                            <button className='text-sm text-primary font-medium' onClick={() => updateCurrentPage('address')}>+ Add New</button>
                                        </div>

                                        <div className=''>
                                            {userData.addresses && userData.addresses.map((address, index) => (
                                                <div key={"Key-" + index} className='w-full min-h-28 bg-zinc-50 flex flex-col justify-center my-2 p-2 border border-pink-200 text-sm rounded-md'>
                                                    <span className='font-medium flex justify-between'>
                                                        {address.firstName} {address.lastName}
                                                        <button onClick={() => handleDeleteClick(address._id)}>
                                                            <MdDeleteForever className='text-lg text-red-600' />
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

                                    <button className='flex w-full mb-16 items-center justify-between font-semibold my-4 hover:text-primary' onClick={() => clearAuthToken()}>
                                        <span>
                                            Logout
                                        </span>
                                        <TbLogout className='text-lg' />
                                    </button>
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

            {currentPage === 'address' && (
                <div className='w-full flex flex-col gap-2'>
                    <button className='flex items-center gap-2 left-2 top-2 text-lg text-primary font-bold' onClick={() => updateCurrentPage('profile')}>
                        <GoArrowLeft />
                        <span className='text-xs'>back</span>
                    </button>
                    <div className='w-full'>
                        <AddAddress goBack={updateCurrentPage} />
                    </div>
                </div>
            )}

            {currentPage === 'edit' && (
                <div className='w-full flex flex-col gap-2'>
                    <button className='flex items-center gap-2 left-2 top-2 text-lg text-primary font-bold' onClick={() => updateCurrentPage('profile')}>
                        <GoArrowLeft />
                        <span className='text-xs'>back</span>
                    </button>
                    <div className='w-full'>
                        <EditProfile user={userSubset}  goBack={updateCurrentPage}/>
                    </div>
                </div>
            )}

            {currentPage === 'reviews' && (
                <div className='w-full flex flex-col gap-2'>
                    <button className='flex items-center gap-2 left-2 top-2 text-lg text-primary font-bold' onClick={() => updateCurrentPage('profile')}>
                        <GoArrowLeft />
                        <span className='text-xs'>back</span>
                    </button>
                    <div className='w-full'>
                        <UserReviews goBack={updateCurrentPage} toggleProfile={toggleProfile}/>
                    </div>
                </div>
            )}

            {currentPage === 'orders' && (
                <div className='w-full flex flex-col gap-2'>
                    <button className='flex items-center gap-2 left-2 top-2 text-lg text-primary font-bold' onClick={() => updateCurrentPage('profile')}>
                        <GoArrowLeft />
                        <span className='text-xs'>back</span>
                    </button>
                    <div className='w-full'>
                        <OrderHistory goBack={updateCurrentPage} toggleProfile={toggleProfile}/>
                    </div>
                </div>
            )}

            {currentPage === 'wishlist' && (
                <div className='w-full flex flex-col gap-2'>
                    <button className='flex items-center gap-2 left-2 top-2 text-lg text-primary font-bold' onClick={() => updateCurrentPage('profile')}>
                        <GoArrowLeft />
                        <span className='text-xs'>back</span>
                    </button>
                    <div className='w-full'>
                        <EditProfile user={userSubset}  goBack={updateCurrentPage}/>
                    </div>
                </div>
            )}
        </>
    );
}

UserProfile.propTypes = {
    gotoLogin: PropTypes.func.isRequired,
    toggleProfile: PropTypes.func.isRequired,
};

export default UserProfile;