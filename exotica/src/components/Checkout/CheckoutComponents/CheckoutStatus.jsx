import api from '@/src/utils/api';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { FaCheckCircle, FaTimesCircle, FaExclamationCircle, FaSpinner } from 'react-icons/fa';

const CheckoutStatus = ({ transactioId }) => {
    const { authToken } = useSelector((state) => state.user);
    const [responseCode, setResponseCode] = useState(null);
    const [responseMessage, setResponseMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleCheckoutClick = async () => {
        if (transactioId) {
            console.log('Transaction ID:', transactioId);
            setLoading(true);
            
            try {
                const response = await api.get(`/payment/status/${transactioId}`, {
                    headers: {
                        'x-auth-token': authToken,
                    }
                });

                console.log('Response:', response);
                
                if (response.status === 200) {
                    setResponseCode(response.status);
                    setResponseMessage(response.data.message || 'Payment processed successfully.');
                    toast.success(response.data.message || 'Payment processed successfully.');
                } else {
                    setResponseCode(response.status);
                    setResponseMessage(response.data.message || 'An error occurred.');
                    toast.error(response.data.message || 'An error occurred.');
                }
            } catch (error) {
                console.log('An error occurred while processing your payment:', error);

                if (error.response) {
                    const errorStatus = error.response.status;
                    const errorMessage = error.response.data.message || 'An unexpected error occurred.';
                    setResponseCode(errorStatus);
                    setResponseMessage(errorMessage);

                    if (errorStatus === 400) {
                        toast.error(`Bad Request: ${errorMessage}`);
                    } else if (errorStatus === 401) {
                        toast.error(`Unauthorized: ${errorMessage}`);
                    } else if (errorStatus === 403) {
                        toast.error(`Forbidden: ${errorMessage}`);
                    } else if (errorStatus === 404) {
                        toast.error(`Not Found: ${errorMessage}`);
                    } else {
                        toast.error(`Error ${errorStatus}: ${errorMessage}`);
                    }
                } else {
                    toast.error('Network error or unexpected issue. Please try again later.');
                }
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        handleCheckoutClick();
    }, [transactioId]);

    return (
        <div className='bg-pink-50 min-h-96 p-4 flex flex-col items-center'>
            {loading && (
                <div className='flex items-center space-x-2'>
                    <FaSpinner className='animate-spin text-gray-600' />
                    <p>Loading...</p>
                </div>
            )}
            {responseCode && responseMessage && (
                <div className={`mt-4 p-4 rounded-lg text-white flex items-center space-x-2 ${responseCode >= 400 ? 'bg-red-600' : responseCode >= 200 ? 'bg-yellow-600' : 'bg-green-600'}` }>
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
            )}
        </div>
    );
};

export default CheckoutStatus;