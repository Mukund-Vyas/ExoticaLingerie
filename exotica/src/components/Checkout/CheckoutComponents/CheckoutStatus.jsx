import api from '@/src/utils/api';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';
import { useRouter } from 'next/router';

const CheckoutStatus = ({ transactionId }) => {
    const { authToken } = useSelector((state) => state.user);
    const [responseCode, setResponseCode] = useState(null);
    const [responseMessage, setResponseMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleCheckoutStatus = async () => {
        if (transactionId) {
            console.log('Transaction ID:', transactionId);
            setLoading(true);

            try {
                const response = await api.get(`/payment/status/${transactionId}`, {
                    headers: {
                        'x-auth-token': authToken,
                    }
                });

                console.log('Response:', response);

                if (response.status === 200) {
                    setResponseCode(response.status);   
                    setResponseMessage(response.data.message || 'Payment processed successfully.');
                    toast.success(response.data.message || 'Payment processed successfully.');
                    router.push("/checkout/Completed");
                    // Update order status to 1 (completed)
                    await updateOrderStatus(transactionId, 1);
                } else {
                    setResponseCode(response.status);
                    setResponseMessage(response.data.message || 'An error occurred.');
                    toast.error(response.data.message || 'An error occurred.');

                    // Update order status to 0 (pending)
                    await updateOrderStatus(transactionId, 0);
                }
            } catch (error) {
                console.log('An error occurred while processing your payment:', error);

                if (error.response) {
                    const errorStatus = error.response.status;
                    const errorMessage = error.response.data.message || 'An unexpected error occurred.';
                    setResponseCode(errorStatus);
                    setResponseMessage(errorMessage);

                    switch (errorStatus) {
                        case 400:
                            toast.error(`Bad Request: ${errorMessage}`);
                            break;
                        case 401:
                            toast.error(`Unauthorized: ${errorMessage}`);
                            break;
                        case 403:
                            toast.error(`Forbidden: ${errorMessage}`);
                            break;
                        case 404:
                            toast.error(`Not Found: ${errorMessage}`);
                            break;
                        default:
                            toast.error(`Error ${errorStatus}: ${errorMessage}`);
                            break;
                    }


                    // Update order status to 0 (pending)
                    await updateOrderStatus(transactionId, 0);
                } else {
                    toast.error('Network error or unexpected issue. Please try again later.');
                    await updateOrderStatus(transactionId, 0);
                }
            } finally {
                setLoading(false);
            }
        }
    };

    const updateOrderStatus = async (orderId, status) => {
        try {
            const response = await api.put(`/order/${orderId}`,
                { status }, {
                headers: {
                    'x-auth-token': authToken,
                }
            });
            if (response.status === 200) {
                toast.success('Order status updated successfully');
            } else {
                toast.error('Failed to update order status. Please try again.');
            }
        } catch (error) {
            console.error('Error updating order status:', error);
            toast.error('An error occurred while updating order status. Please try again.');
        }
    };

    useEffect(() => {
        handleCheckoutStatus();
    }, [transactionId]);

    return (
        <div className='bg-pink-50 min-h-96 p-4 flex flex-col items-center'>
            {loading ? (
                <div className='flex items-center space-x-2'>
                    <FaSpinner className='animate-spin text-gray-600' />
                    <p>Loading...</p>
                </div>
            ) : (
                responseCode && responseMessage && (
                    <div className={`mt-4 p-4 rounded-lg text-white flex items-center space-x-2 ${responseCode >= 400 ? 'bg-red-600' : 'bg-green-600'}`}>
                        {responseCode >= 400 ? (
                            <FaTimesCircle className='text-2xl' />
                        ) : (
                            <FaCheckCircle className='text-2xl' />
                        )}
                        <div>
                            <h2 className='font-bold text-lg'>Status Code: {responseCode}</h2>
                            <p>{responseMessage}</p>
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default CheckoutStatus;