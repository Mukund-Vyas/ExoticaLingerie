import Image from 'next/image';
import Link from 'next/link'
import React from 'react'

const StyleImageGrid = () => {
    return (
        <div
            className="styleImage-container mt-1.5"
            style={{
                backgroundImage:
                    'url("/Images/Intiment/bg.webp")',
            }}
        >
            <div className='bg-black bg-opacity-40'>
                <h2 className='py-8 text-5xl max-xl:text-4xl max-lg:text-3xl max-md:text-xl max-md:py-4 font-bold font-[salsa] text-[yellow] text-shadow-md'>intimate styles galore to make your day comfortable.</h2>

                <div className="flex flex-col gap-4">
                    <div className='flex justify-around'>
                        <Link href={'/products'}>
                            <div className="relative w-80 h-80 rounded-2xl max-sm:w-28 max-sm:h-28 max-xl:w-72 max-xl:h-72 max-lg:w-56 max-lg:h-56 max-md:w-48 max-md:h-48">
                                <Image
                                    src="/Images/Intiment/bra.webp"
                                    alt="latest bra from exotica lingerie"
                                    layout='fill'
                                    className='rounded-2xl object-cover'
                                />
                            </div>

                            <div className='flex flex-col items-start'>
                                <h2 className='styleImage-h2'>Bras</h2>
                                <h3 className='styleImage-h3'>Uppto 50% off</h3>
                            </div>
                        </Link>
                        <Link href={'/products'}>
                            <div className="relative w-80 h-80 rounded-2xl max-sm:w-28 max-sm:h-28 max-xl:w-72 max-xl:h-72 max-lg:w-56 max-lg:h-56 max-md:w-48 max-md:h-48">
                                <Image
                                    src="/Images/Intiment/Panty.webp"
                                    alt="latest bra from exotica lingerie"
                                    layout='fill'
                                    className='rounded-2xl object-cover'
                                />
                            </div>
                            <div className='flex flex-col items-start'>
                                <h2 className='styleImage-h2'>Panties</h2>
                                <h3 className='styleImage-h3'>Uppto 50% off</h3>
                            </div>
                        </Link>
                        <Link href={'/products'}>
                            <div className="relative w-80 h-80 rounded-2xl max-sm:w-28 max-sm:h-28 max-xl:w-72 max-xl:h-72 max-lg:w-56 max-lg:h-56 max-md:w-48 max-md:h-48">
                                <Image
                                    src="/Images/Intiment/activewear.webp"
                                    alt="latest bra from exotica lingerie"
                                    layout='fill'
                                    className='rounded-2xl object-cover'
                                />
                            </div>
                            <div className='flex flex-col items-start'>
                                <h2 className='styleImage-h2'>Activewear</h2>
                                <h3 className='styleImage-h3'>Uppto 60% off</h3>
                            </div>
                        </Link>
                    </div>
                    <div className='flex justify-around'>
                        <Link href={'/products'}>
                            <div className="relative w-80 h-80 rounded-2xl max-sm:w-28 max-sm:h-28 max-xl:w-72 max-xl:h-72 max-lg:w-56 max-lg:h-56 max-md:w-48 max-md:h-48">
                                <Image
                                    src="/Images/Intiment/shepwear.webp"
                                    alt="latest bra from exotica lingerie"
                                    layout='fill'
                                    className='rounded-2xl object-cover'
                                />
                            </div>
                            <div className='flex flex-col items-start'>
                                <h2 className='styleImage-h2'>Shapewear</h2>
                                <h3 className='styleImage-h3'>Uppto 45% off</h3>
                            </div>
                        </Link>
                        <Link href={'/products'}>
                            <div className="relative bg-white w-80 h-80 rounded-2xl max-sm:w-28 max-sm:h-28 max-xl:w-72 max-xl:h-72 max-lg:w-56 max-lg:h-56 max-md:w-48 max-md:h-48">
                                <Image
                                    src="/Images/Intiment/Lingerieset.webp"
                                    alt="latest bra from exotica lingerie"
                                    layout='fill'
                                    className='rounded-2xl object-cover'
                                />
                            </div><div className='flex flex-col items-start'>
                                <h2 className='styleImage-h2'>Lingerie set</h2>
                                <h3 className='styleImage-h3'>Uppto 50% off</h3>
                            </div>
                        </Link>
                        <Link href={'/products'}>
                            <div className="relative w-80 h-80 rounded-2xl max-sm:w-28 max-sm:h-28 max-xl:w-72 max-xl:h-72 max-lg:w-56 max-lg:h-56 max-md:w-48 max-md:h-48">
                                <Image
                                    src="/Images/Intiment/yogabra.webp"
                                    alt="latest bra from exotica lingerie"
                                    layout='fill'
                                    className='rounded-2xl object-cover'
                                />
                            </div>
                            <div className='flex flex-col items-start'>
                                <h2 className='styleImage-h2'>Yoga</h2>
                                <h3 className='styleImage-h3'>Uppto 60% off</h3>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StyleImageGrid