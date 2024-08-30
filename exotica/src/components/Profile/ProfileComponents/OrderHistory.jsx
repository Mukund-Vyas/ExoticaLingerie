import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import NoOrder from '../../../../public/Images/NoOrders.png'
import { useSelector } from 'react-redux';
import { Oval } from 'react-loader-spinner';
import api from '@/src/utils/api';
import { FcCalendar, FcInfo, FcMoneyTransfer, FcPackage, FcShipped, FcSurvey } from 'react-icons/fc';
import { BsInfoCircleFill } from 'react-icons/bs';

const OrderHistory = ({ goBack, toggleProfile }) => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { authToken } = useSelector((state) => state.user);

    const handleGotoProductsClick = () => {
        toggleProfile();
        goBack('profile');
    }

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                const response = await api.get("/order/user/orders",
                    {
                        headers: {
                            'x-auth-token': `${authToken}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
                const sortedOrders = response.data
                                    .filter(order => order.orderStatus === 1)
                                    .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
                // console.log(sortedOrders);
                setOrders(sortedOrders);
            } catch (error) {
                console.error('Error fetching order history:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrderHistory();
    }, [authToken]);

    return (
        <div className="w-full">
            {isLoading ? (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <Oval color="#ff197d" secondaryColor="#ffb1d3" height={80} width={80} />
                </div>
            ) : (
                <>
                    <h2 className="flex items-center gap-1.5 font-bold text-gray-700 mb-6"> <FcSurvey /> Order History</h2>
                    {orders?.length > 0 ? (
                        <div className="space-y-4">
                            {orders.map((order) => (
                                <div key={order.orderNumber} className="border rounded-lg p-2 bg-white shadow-sm">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-4">
                                            <div>
                                                <h3 className="font-medium">Order #{order.orderNumber}</h3>
                                                <p className="text-sm text-gray-500">Placed on {new Date(order.orderDate).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex justify-between items-start flex-col">
                                        <div className="text-sm text-gray-600">
                                            <FcCalendar className="inline-block mr-2" />
                                            Expected Delivery: {new Date(order.expDeliveryDate).toLocaleDateString()}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            <FcMoneyTransfer className="inline-block mr-2" />
                                            Total: ₹{order.orderTotal}
                                        </div>
                                    </div>
                                    <div className="mt-4 flex justify-end">
                                        <button className="flex items-center gap-2 text-primary text-sm font-medium hover:underline">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (<div className='flex flex-col gap-4 items-center justify-center my-10'>
                        <div className='w-full flex items-center justify-center'>
                            <Image src={NoOrder} width={250} className='bg-rose-200 rounded-lg' alt='empty order thumbnail'></Image>
                        </div>
                        <div>
                            <p className='text-center font-medium'>Your order history is empty!</p>
                            <p className='text-center text-sm'>
                                Discover our stunning lingerie and make your first purchase today!
                            </p>
                        </div>
                        <Link href="/products" passHref onClick={() => handleGotoProductsClick()}>
                            <button className="bg-primary hover:bg-pink-600 text-white font-medium py-2 px-4 rounded">
                                Let's go Shopping
                            </button>
                        </Link>
                    </div>)}
                </>
            )}
        </div>

    )
}

OrderHistory.propTypes = {
    goBack: PropTypes.func.isRequired,
    toggleProfile: PropTypes.func.isRequired,
};

export default OrderHistory