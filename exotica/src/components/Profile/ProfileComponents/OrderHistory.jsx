import Link from 'next/link';
import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import NoOrder from '../../../../public/Images/NoOrders.png'

const OrderHistory = ({goBack, toggleProfile}) => {
    const handleGotoProductsClick = () =>{
        toggleProfile();
        goBack('profile');
    }
    return (
        <div className='flex flex-col gap-4 items-center justify-center my-10'>
            <div className='w-full flex items-center justify-center'>
                <Image src={NoOrder} width={250} className='bg-rose-200 rounded-lg'></Image>
            </div>
            <div>
                <p className='text-center font-medium'>Your order history is empty!</p>
                <p className='text-center text-sm'>
                    Discover our stunning lingerie and make your first purchase today!
                </p>
            </div>
            <Link href="/products" passHref onClick={()=>handleGotoProductsClick()}>
                <button className="bg-primary hover:bg-pink-600 text-white font-medium py-2 px-4 rounded">
                    Let's go Shopping
                </button>
            </Link>
        </div>
    )
}

OrderHistory.propTypes = {
    goBack: PropTypes.func.isRequired,
    toggleProfile: PropTypes.func.isRequired,
};

export default OrderHistory