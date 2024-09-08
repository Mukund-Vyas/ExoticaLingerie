import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { Oval } from 'react-loader-spinner';
import { useSelector } from 'react-redux';

const OrderDetailsLayout = () => {
    const router = useRouter();
    // const { orderNumber } = router.query;
    const [order, setOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { authToken } = useSelector((state) => state.user);

    const orderNumber = "EXO1725423640018"
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
        return <p>Order not found</p>;
    }

    return (
        <div className="w-full p-6">
            <h2 className="flex items-center gap-1.5 font-bold text-gray-700 mb-6">
                <FcSurvey /> Order Details
            </h2>

            <div className="border rounded-lg p-4 bg-white shadow-md">
                <div className="flex justify-between items-center border-b pb-4">
                    <div>
                        <p className="text-gray-500 mb-1">
                            Order ID <span className="font-medium text-gray-800">{order.orderNumber}</span>
                        </p>
                        <p className="text-gray-500">
                            Placed On <span className="font-medium text-gray-800">{new Date(order.trackingDetails.orderDate).toLocaleDateString()}</span>
                        </p>
                        <p className="text-gray-500">
                            Status <span className="font-medium text-gray-800">{order.trackingDetails.currentShippingStatus}</span>
                        </p>
                    </div>
                </div>

                <div className="py-4">
                    <h3 className="text-lg font-medium mb-2">Product Information</h3>
                    {order.items.map(item => (
                        <div key={item.Sku} className="flex items-center border-b pb-4 mb-4">
                            <div className="w-24 h-24 mr-4">
                                <Image
                                    src={item.productImage ? process.env.NEXT_PUBLIC_Image_URL + "/" + item.productImage : '/Images/placeholder.png'}
                                    alt={item.productName}
                                    width={96}
                                    height={96}
                                    className="object-cover rounded-lg"
                                />
                            </div>
                            <div>
                                <h5 className="text-sm font-medium">{item.productName}</h5>
                                <p className="text-gray-500">Qty: {item.quantity}</p>
                                <p className="text-gray-500">SKU: {item.Sku}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="py-4 border-t border-gray-200">
                    <h3 className="text-lg font-medium mb-2">Tracking Status</h3>
                    <p className="text-gray-500">Carrier: <span className="font-medium text-gray-800">{order.trackingDetails.carrierName}</span></p>
                    <p className="text-gray-500">AWB Number: <span className="font-medium text-gray-800">{order.trackingDetails.awbNumber}</span></p>
                    <p className="text-gray-500">Current Status: <span className="font-medium text-gray-800">{order.trackingDetails.currentShippingStatus}</span></p>
                    <p className="text-gray-500">Order Date: <span className="font-medium text-gray-800">{new Date(order.trackingDetails.orderDate).toLocaleDateString()}</span></p>
                    <p className="text-gray-500">Expected Delivery: <span className="font-medium text-gray-800">{order.trackingDetails.expectedDeliveryDate === '0000-00-00 00:00:00' ? 'Not Available' : new Date(order.trackingDetails.expectedDeliveryDate).toLocaleDateString()}</span></p>
                </div>

                <div className="py-4 border-t border-gray-200">
                    <h3 className="text-lg font-medium mb-2">Payment Details</h3>
                    <p className="text-gray-500">Order Total: <span className="font-medium text-gray-800">₹{order.orderTotal?.toFixed(2) || '0.00'}</span></p>
                </div>

                <div className="py-4 border-t border-gray-200">
                    <h3 className="text-lg font-medium mb-2">Shipping Details</h3>
                    <p className="text-gray-500">Customer Name: <span className="font-medium text-gray-800">{order.trackingDetails.customer_name}</span></p>
                    <p className="text-gray-500">Contact Number: <span className="font-medium text-gray-800">{order.trackingDetails.customer_mobile_num}</span></p>
                    <p className="text-gray-500">Address: <span className="font-medium text-gray-800">{order.trackingDetails.city}, {order.trackingDetails.state}, {order.trackingDetails.pin_code}</span></p>
                </div>
            </div>
        </div>
    );

}

export default OrderDetailsLayout