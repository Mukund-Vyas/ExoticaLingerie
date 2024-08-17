import CheckoutStatus from '@/src/components/Checkout/CheckoutComponents/CheckoutStatus';
import { useRouter } from 'next/router';
import React from 'react'
import { Toaster } from 'react-hot-toast';

const Index = () => {
    const params = useRouter();
    const { checkout } = params.query
    
    return (
        <div>
            {checkout && <CheckoutStatus transactioId = {checkout}/>}
            {!checkout && (
                <div className='bg-pink-50 h-96'></div>
            )}
            <div><Toaster position="bottom-center" reverseOrder={false} /></div>
        </div>
    )
}

export default Index