import api from '@/src/utils/api';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';

const index = () => {
    const params = useRouter();
    const {authToken} = useSelector((state)=>state.user);
    const { checkout } = params.query
    
    const handleCheckoutClick = async () => {
        if(checkout){
            console.log(checkout);
            
            try {
                const response = await api.get(`/payment/status/${checkout}`,{
                    headers: {
                        'x-auth-token': authToken,
                    }
                });
                // console.log(response.status);
                
                console.log(response.message);

                if (response.status === 200) {
                    console.log('200');
                    
                    toast.success(response.message)
                } else {
                    toast.error(response.message);
                }
            } catch (error) {

                console.log('An error occurred while processing your payment. Please try again.', error);
                const errorStatus = error.response ? error.response.status : 'Unknown';
                const errorMessage = error.response ? error.response.data.message : 'An unexpected error occurred.';

                // Display error message based on status code
                toast.error(`Erro: ${errorMessage}`);
            }
        }
    }

    useEffect(()=>{
        handleCheckoutClick();
    }, [checkout])
    return (
        <div>
            index
            <div><Toaster position="bottom-center" reverseOrder={false} /></div>
        </div>
    )
}

export default index