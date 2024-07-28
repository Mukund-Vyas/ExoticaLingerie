import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import pageNotFoundImage from '../public/Images/404.png';

const Custom404 = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50 p-4">
            <Image src={pageNotFoundImage} alt="Oops! We couldn't find that page." className="w-1/2 max-w-md mb-8" />
            <p className="text-xl font-bold mb-8 text-center">
                <span className='text-primary text-2xl'>Oops!</span> It looks like we can't find that page.
                <br />
                But don't worry, we have plenty of other beautiful items for you.
            </p>
            <Link href="/productPage">
                <button className="text-primary font-semibold underline hover:no-underline hover:text-pink-600 transition duration-500">
                    Browse Our Collections
                </button>

            </Link>
        </div>
    )
}

export default Custom404