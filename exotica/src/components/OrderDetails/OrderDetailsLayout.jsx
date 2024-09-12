import api from '@/src/utils/api';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Oval } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';


const OrderDetailsLayout = ({ orderNumber }) => {
    const [order, setOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { authToken } = useSelector((state) => state.user);
    console.log(orderNumber);

    // const orderNumber = "EXO1725423582241"
    useEffect(() => {
        const fetchOrderDetails = async () => {
            if (!orderNumber) return;
            try {
                const response = await api.get(`/order/getDetails/${orderNumber}`, {
                    headers: {
                        'x-auth-token': `${authToken}`,
                        'Content-Type': 'application/json',
                    },
                });
                setOrder(response.data);
            } catch (error) {
                console.error('Error fetching order details:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrderDetails();
    }, [orderNumber, authToken]);

    if (isLoading) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <Oval color="#ff197d" secondaryColor="#ffb1d3" height={80} width={80} />
            </div>
        );
    }

    if (!order) {
        return <div className='flex w-full items-center flex-col min-h-[75vh] justify-center gap-4'>
            <Image
                src={'/Images/IconImages/NoOrder.webp'}
                alt={'order not found'}
                width={256}
                height={256}
                className="object-cover rounded-lg border border-slate-400"
            />
            <p className='font-medium text-lg'><span className='text-primary text-xl'>Oops!!!</span> We couldn't find your order. Please check the order Id</p>
        </div>;
    }
    console.log(order);

    return (
        <div className="w-full p-6 max-md:p-1 max-md:text-sm">
            <div className='w-auto bg-white p-10 rounded-lg border border-slate-400 flex flex-col gap-4 max-md:p-2'>
                <div className='flex flex-col w-full items-center justify-center'>
                    <span className='flex items-center gap-2'>
                        <p className='font-semibold'>Order Id: </p>
                        <p>{order.orderNumber}</p>
                    </span>
                    <span className='flex items-center gap-2'>
                        <p className='font-semibold'>Order Placed On: </p>
                        <p>{new Date(order.trackingDetails.orderDate).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                        })}</p>
                    </span>
                </div>

                <div className='w-full flex gap-6 max-md:flex-col'>
                    <div className='w-full border border-slate-400 rounded-md h-fit'>
                        <div className='p-3 border-b border-slate-400 flex justify-between items-center'>
                            <h1 className='font-medium'>Product Information</h1>
                        </div>

                        <div className='w-full'>
                            {order.items.map(item => (
                                <div key={item.Sku} className="flex items-start border-b p-2 gap-2">
                                    <Image
                                        src={item.productImage ? process.env.NEXT_PUBLIC_Image_URL + "/" + item.productImage : '/Images/placeholder.png'}
                                        alt={item.productName}
                                        width={80}
                                        height={80}
                                        className="object-cover rounded-lg border border-slate-400"
                                    />
                                    <div className='text-sm'>
                                        <h5 className="font-medium">{item.productName}</h5>
                                        <p className="text-gray-500">color: {item.Sku.split("-")[item.Sku.split("-").length - 2]} </p>
                                        <p className="text-gray-500">size: {item.Sku.split("-")[item.Sku.split("-").length - 1]} </p>
                                        <p className="text-gray-500">qty: {item.Quantity} </p>
                                        <span className="text-gray-500 flex gap-2">
                                            Price:
                                            <p className='line-through'>₹{item.Price.toFixed(2)}</p>
                                            <p className='font-medium text-slate-900'>₹{(item.Price - item.itemDiscount).toFixed(2)}</p>
                                        </span>
                                    </div>
                                </div>
                            ))}

                            <div className='border-t border-slate-400'>
                                <div className='p-3 border-b border-slate-400 flex justify-between items-center'>
                                    <h1 className='font-medium'>Tracking Status</h1>
                                    <span className='font-bold text-primary' title={order?.trackingDetails?.orderStatus || 'N/A'}>
                                        {order?.trackingDetails?.currentShippingStatus === 'Delivered'
                                            ? order.trackingDetails.currentShippingStatus
                                            : order?.trackingDetails?.orderStatus || 'N/A'}
                                    </span>
                                </div>

                                <div className="p-2 border-t border-gray-200">
                                    <p className="text-gray-500">Carrier Partner: <span className="font-medium text-gray-800">{order.trackingDetails.carrierName}</span></p>
                                    <p className="text-gray-500">Tracking ID: <span className="font-medium text-gray-800">{order.trackingDetails.awbNumber}</span></p>
                                    <p className="text-gray-500">Current Status: <span className="font-medium text-gray-800">{order.trackingDetails.currentShippingStatus} | {new Date(order.trackingDetails?.shippingHistory[0]?.time).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span></p>
                                    <p className="text-gray-500">Order Date: <span className="font-medium text-gray-800">{new Date(order.trackingDetails.orderDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span></p>
                                    <p className="text-gray-500">Expected Delivery: <span className="font-medium text-gray-800">{order.expDeliveryDate === '0000-00-00 00:00:00' ? 'Not Available' : new Date(order.expDeliveryDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full h-fit flex flex-col gap-2'>
                        <div className='w-full border border-slate-400 rounded-md'>
                            <div className='w-full'>
                                <div className='w-full'>
                                    <div className='p-3 border-b border-slate-400 flex justify-between items-center'>
                                        <h1 className='font-medium'>Payment Details</h1>
                                    </div>

                                    <div className="p-2 border-t border-gray-200">
                                        <p className="flex justify-between items-center">MRP: <span className="text-gray-800">₹{order.items.reduce((total, item) => total + (item.Price || 0), 0).toFixed(2)}</span></p>
                                        <p className="flex justify-between items-center">Savings on MRP: <span className="text-primary">- ₹{order.items.reduce((total, item) => total + (item.itemDiscount || 0), 0).toFixed(2)}</span></p>
                                        <p className="flex justify-between items-center">Shipping Charges: <span className="text-gray-800">₹{order.shippingCost.toFixed(2)}</span></p>
                                        {
                                            order.paymentMode === 0 && (
                                                <p className="flex justify-between items-center">COD Charges: <span className="text-gray-800">₹29.00</span></p>
                                            )
                                        }
                                        <p className="flex justify-between items-center">Payment Mode: <span className="text-gray-800">{order.paymentMode === 0 ? "Cash on Delivery" : "Online(prepaid)"}</span></p>
                                    </div>
                                    <div className='p-3 border-t border-slate-400 flex justify-between items-center'>
                                        <h1 className='font-medium'>Total</h1>
                                        <p>₹{order.orderTotal.toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='w-full border border-slate-400 rounded-md'>
                            <div className='w-full'>
                                <div className='w-full'>
                                    <div className='p-3 border-b border-slate-400 flex justify-between items-center'>
                                        <h1 className='font-medium'>Shipping Details</h1>
                                    </div>

                                    <div className="p-2 border-t border-gray-200">
                                        <p className='font-medium'>{order.trackingDetails.customer_name}</p>
                                        <p>{order.customer.shipping.addressLine1} <br /><span>{order.trackingDetails.city}, {order.trackingDetails.state}, {order.trackingDetails.pin_code}</span></p>
                                        <p>Contact No: <span className='font-medium'>{order.trackingDetails.customer_mobile_num}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

OrderDetailsLayout.propTypes = {
    orderNumber: PropTypes.string.isRequired,
}

export default OrderDetailsLayout