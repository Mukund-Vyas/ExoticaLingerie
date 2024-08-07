import Link from 'next/link';
import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import NoReviews from '../../../../public/Images/NoReviews.png'

const UserReviews = ({ goBack, toggleProfile }) => {
    const handleGotoProductsClick = () => {
        toggleProfile();
        goBack('profile');
    }
    return (
        <div className='flex flex-col gap-4 items-center justify-center my-10'>
            <div className='w-full flex items-center justify-center'>
                <Image src={NoReviews} width={250} className='bg-white rounded-lg'></Image>
            </div>
            <div>
                <p className='text-center font-medium'>You haven't shared any reviews yet!</p>
                <p className='text-center text-sm'>
                    Shop our stunning lingerie and be the first to leave your thoughts!
                </p>
            </div>
            <Link href="/products" passHref onClick={() => handleGotoProductsClick()}>
                <button className="bg-primary hover:bg-pink-600 text-white font-medium py-2 px-4 rounded">
                    Let's go Shopping
                </button>
            </Link>
        </div>
    )
}
UserReviews.propTypes = {
    goBack: PropTypes.func.isRequired,
    toggleProfile: PropTypes.func.isRequired,
};

export default UserReviews