import { setCartOpen } from '@/Redux/Reducers/cartSlice';
import CheckoutStatus from '@/src/components/Checkout/CheckoutComponents/CheckoutStatus';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { IoBagCheckSharp } from "react-icons/io5";
import { useDispatch } from 'react-redux';

const Index = () => {
    const router = useRouter();
    const [transactionId, setTransactionId] = useState(null);
    const cartDispatch = useDispatch();

    cartDispatch(setCartOpen({ isOpen: false }));
    useEffect(() => {
        if (router.query.checkout) {
            setTransactionId(router.query.checkout);
        }
    }, [router.query.checkout]);

    if (!transactionId) {
        // Optionally show a loading state or nothing if the transactionId is not available
        return <div>Loading...</div>;
    }

    return (
        <div>
            {transactionId === "Completed" ? (<div className='w-full h-96 py-20 bg-pink-50'>
                <div className='flex flex-col items-center gap-4'>
                <IoBagCheckSharp className='text-9xl text-green-700'/>
                <h1>
                    Your order has been placed successfully!, <br /> 🎉 We're excited to get it to you soon!
                </h1>
                <Link href={"/products"} className='bg-rose-500 px-5 py-2 rounded-md text-white font-medium'>
                    Let`s explore more..!
                </Link>
                </div>
            </div>) : (<> <CheckoutStatus transactionId={transactionId} />
                <div><Toaster position="bottom-center" reverseOrder={false} /></div></>)}

        </div>
    );
};

export default Index;