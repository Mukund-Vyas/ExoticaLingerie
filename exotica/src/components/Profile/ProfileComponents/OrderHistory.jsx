import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import NoOrder from '../../../../public/Images/NoOrders.png';
import { useSelector } from 'react-redux';
import { Oval } from 'react-loader-spinner';
import api from '@/src/utils/api';
import { FcSurvey } from 'react-icons/fc';

const OrderHistory = ({ goBack, toggleProfile }) => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { authToken } = useSelector((state) => state.user);

    const handleGotoProductsClick = () => {
        toggleProfile();
        goBack('profile');
    };

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                const response = await api.get("/order/user/orders", {
                    headers: {
                        'x-auth-token': `${authToken}`,
                        'Content-Type': 'application/json',
                    },
                });
                const sortedOrders = response.data
                    .filter(order => order.orderStatus >= 1)
                    .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
                setOrders(sortedOrders);
            } catch (error) {
                console.error('Error fetching order history:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrderHistory();
    }, [authToken]);

    const getStepClass = (currentStatus, step) => {
        return currentStatus >= step ? 'active' : '';
    };

    console.log(orders[0]);
    
    return (
        <div className="w-full">
            {isLoading ? (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <Oval color="#ff197d" secondaryColor="#ffb1d3" height={80} width={80} />
                </div>
            ) : (
                <>
                    <h2 className="flex items-center gap-1.5 font-bold text-gray-700 mb-6">
                        <FcSurvey /> Order History
                    </h2>
                    {orders?.length > 0 ? (
                        <div className="space-y-4">
                            {orders.map((order) => (
                                <div key={order.orderNumber} className="border rounded-lg p-4 bg-white shadow-md text-sm">
                                    <div className="flex justify-between items-center border-b pb-4">
                                        <div>
                                            <p className="text-gray-500 mb-1">
                                                Order ID <span className="font-medium text-gray-800">{order.orderNumber}</span>
                                            </p>
                                            <p className="text-gray-500">
                                                Placed On <span className="font-medium text-gray-800">{new Date(order.orderDate).toLocaleDateString()}</span>
                                            </p>
                                        </div>
                                        <div>
                                            <Link href={`/order/${order.orderNumber}`}>
                                                <span className="text-primary font-medium hover:underline">View Details</span>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="flex lg:flex-row justify-between items-start py-4">
                                        <div>
                                            <h5 className="text-sm font-medium">{order?.items[0]?.productName}</h5>
                                            <p className="text-gray-500">Qty: {order?.items[0]?.Quantity} item</p>
                                            <h4 className="text-lg font-medium my-2">₹{order?.orderTotal?.toFixed(2)}</h4>
                                            <p className="text-gray-500">
                                                Tracking Status on: <span className="font-medium text-gray-800">{new Date().toLocaleDateString()}</span>
                                            </p>
                                        </div>
                                        <div className="mt-0 lg:ml-4">
                                            <img
                                                src={process.env.NEXT_PUBLIC_Image_URL + "/" + order?.items[0]?.productImage || '/Images/placeholder.png'}
                                                alt="Order Item"
                                                width={150}
                                                height={150}
                                                className="object-cover rounded-lg max-sm:w-36 border "
                                            />
                                        </div>
                                    </div>
                                    <div className="stepper flex items-center justify-between relative">
                                        <div className="absolute w-full h-0.5 bg-gray-200 top-1/2 left-0 z-0"></div>
                                        <div className={`step z-10 ${getStepClass(order.orderStatus, 1)}`}>
                                            <div className="step-icon">1</div>
                                            <div>PLACED</div>
                                        </div>
                                        <div className={`step z-10 ${getStepClass(order.orderStatus, 2)}`}>
                                            <div className="step-icon">2</div>
                                            <div>SHIPPED</div>
                                        </div>
                                        <div className={`step z-10 ${getStepClass(order.orderStatus, 3)}`}>
                                            <div className="step-icon">3</div>
                                            <div>DELIVERED</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className='flex flex-col gap-4 items-center justify-center my-10'>
                            <div className='w-full flex items-center justify-center'>
                                <Image src={NoOrder} width={250} className='bg-rose-200 rounded-lg' alt='empty order thumbnail' />
                            </div>
                            <div>
                                <p className='text-center font-medium'>Your order history is empty!</p>
                                <p className='text-center text-sm'>
                                    Discover our stunning lingerie and make your first purchase today!
                                </p>
                            </div>
                            <Link href="/products" passHref onClick={handleGotoProductsClick}>
                                <button className="bg-primary hover:bg-pink-600 text-white font-medium py-2 px-4 rounded">
                                    Let's go Shopping
                                </button>
                            </Link>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

OrderHistory.propTypes = {
    goBack: PropTypes.func.isRequired,
    toggleProfile: PropTypes.func.isRequired,
};

export default OrderHistory;
