import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import NoOrder from '../../../../public/Images/NoOrders.png';
import { useDispatch, useSelector } from 'react-redux';
import { Oval } from 'react-loader-spinner';
import api from '@/src/utils/api';
import { FcSurvey } from 'react-icons/fc';
import { setProfileOpen } from '@/Redux/Reducers/profileSlice';

const OrderHistory = ({ goBack, toggleProfile }) => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { authToken } = useSelector((state) => state.user);
    const dispatch = useDispatch();

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

                // Filter and sort orders based on updated backend response
                const sortedOrders = response.data
                    .filter(order => order.trackingDetails?.orderStatus)
                    .sort((a, b) => new Date(b.trackingDetails.orderDate) - new Date(a.trackingDetails.orderDate));
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
        const statusMap = {
            'Placed': 1,
            'Shipped': 2,
            'Delivered': 3,
        };
        return statusMap[currentStatus] >= step ? 'active' : '';
    };
    
    console.log(orders);
    
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
                                <div key={order.orderNumber} className="border rounded-lg p-2 bg-white shadow-md text-sm">
                                    <div className="flex justify-between items-center border-b pb-4">
                                        <div>
                                            <p className="text-gray-500 mb-1">
                                                Order ID <span className="font-medium text-gray-800">{order.orderNumber}</span>
                                            </p>
                                            <p className="text-gray-500">
                                                Placed On <span className="font-medium text-gray-800">{new Date(order.trackingDetails.orderDate).toLocaleDateString()}</span>
                                            </p>
                                        </div>
                                        <div>
                                            <Link href={`/orderDetails/${order.orderNumber}`} onClick={()=>dispatch(setProfileOpen({ isOpen: false }))}>
                                                <span className="text-primary font-medium hover:underline">View Details</span>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="flex lg:flex-row justify-between items-start py-4 text-sm">
                                        <div>
                                            {order.items.length > 0 && (
                                                <>
                                                    <h5 className="font-medium">{order.items[0]?.productName || 'Product Name'}</h5>
                                                    <p className="text-gray-500">Qty: {order.items[0]?.quantity || 'N/A'} item</p>
                                                    <h4 className="text-lg font-medium my-2">₹{order.orderTotal?.toFixed(2) || '0.00'}</h4>
                                                </>
                                            )}
                                        </div>
                                        <div className="mt-0 lg:ml-4">
                                            <Image
                                                src={order.items[0]?.productImage ? process.env.NEXT_PUBLIC_Image_URL + "/" + order.items[0].productImage : '/Images/placeholder.png'}
                                                alt="Order Item"
                                                width={150}
                                                height={150}
                                                className="object-cover rounded-lg max-sm:w-36 border "
                                            />
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-3'>
                                        <div className='w-full'>
                                            <p className="text-gray-500">
                                                Carrier Partner: <span className="font-medium text-gray-800">{order.trackingDetails?.carrierName || 'N/A'}</span>
                                            </p>
                                            <p className="text-gray-500">
                                                Tracking ID: <span className="font-medium text-gray-800">{order.trackingDetails?.awbNumber || 'N/A'}</span>
                                            </p>
                                            <p className="text-gray-500">
                                                Current Status: <span className="font-medium text-gray-800">{order.trackingDetails?.currentShippingStatus || 'N/A'} | {new Date(order.trackingDetails?.shippingHistory[0]?.time).toLocaleDateString()}</span>
                                            </p>
                                        </div>
                                        <div className="stepper flex items-center justify-between relative">
                                            <div className="absolute w-full h-0.5 bg-gray-200 top-1/2 left-0 z-0"></div>
                                            <div className={`step z-10 ${getStepClass(order?.trackingDetails?.orderStatus, 1)}`}>
                                                <div className="step-icon">1</div>
                                                <div>PLACED</div>
                                            </div>
                                            <div className={`step z-10 ${getStepClass(order?.trackingDetails?.orderStatus, 2)}`}>
                                                <div className="step-icon">2</div>
                                                <div>SHIPPED</div>
                                            </div>
                                            <div className={`step z-10 ${getStepClass(order?.trackingDetails?.currentShippingStatus, 3)}`}>
                                                <div className="step-icon">3</div>
                                                <div>DELIVERED</div>
                                            </div>
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
