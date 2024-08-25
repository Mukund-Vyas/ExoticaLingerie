import Link from 'next/link'
import React from 'react'

const StyleImageGrid = () => {
    return (
        <div
            className="styleImage-container mt-1.5"
            style={{
                backgroundImage:
                    'url("https://www.camille.co.uk/blog/wp-content/uploads/2019/05/GettyImages-949598644-1080x720.jpg")',
            }}
        >
            <div className='bg-black bg-opacity-40'>
                <h1 className='py-6'>intimate styles galore to make your day comfortable.</h1>

                <div className="flex flex-col gap-4">
                    <div className='flex justify-around'>
                        <Link href={'/products'}>
                            <img
                                src="https://res.cloudinary.com/dcxdcs6l4/image/upload/v1724571053/ctgmlzj2gfowzre6ki3k.webp"
                                alt="latest bra from exotica lingerie"
                                className='w-80 h-80 rounded-2xl max-sm:w-28 max-sm:h-28 max-xl:w-72 max-xl:h-72 max-lg:w-56 max-lg:h-56 max-md:w-48 max-md:h-48'
                            />
                            <div className='flex flex-col items-start'>
                                <h2 className='styleImage-h2'>Bras</h2>
                                <h3 className='styleImage-h3'>Uppto 50% off</h3>
                            </div>
                        </Link>
                        <Link href={'/products'}>
                            <img
                                src="https://res.cloudinary.com/dcxdcs6l4/image/upload/v1724571054/jrs4dymkelnrsiudcugl.webp"
                                alt="panties for girls"
                                className='w-80 h-80 rounded-2xl max-sm:w-28 max-sm:h-28 max-xl:w-72 max-xl:h-72 max-lg:w-56 max-lg:h-56 max-md:w-48 max-md:h-48'
                            />
                            <div className='flex flex-col items-start'>
                                <h2 className='styleImage-h2'>Panties</h2>
                                <h3 className='styleImage-h3'>Uppto 50% off</h3>
                            </div>
                        </Link>
                        <Link href={'/products'}>
                            <img
                                src="https://m.media-amazon.com/images/I/71axldpOndL._AC_UY1100_.jpg"
                                alt="Activewear for womens"
                                className='w-80 h-80 rounded-2xl max-sm:w-28 max-sm:h-28 max-xl:w-72 max-xl:h-72 max-lg:w-56 max-lg:h-56 max-md:w-48 max-md:h-48'
                            />
                            <div className='flex flex-col items-start'>
                                <h2 className='styleImage-h2'>Activewear</h2>
                                <h3 className='styleImage-h3'>Uppto 60% off</h3>
                            </div>
                        </Link>
                    </div>
                    <div className='flex justify-around'>
                        <Link href={'/products'}>
                            <img
                                src="https://res.cloudinary.com/dcxdcs6l4/image/upload/v1687779353/-473Wx593H-463739011-beige-MODEL2_qh2tef.jpg"
                                alt="shapewear"
                                className='w-80 h-80 rounded-2xl max-sm:w-28 max-sm:h-28 max-xl:w-72 max-xl:h-72 max-lg:w-56 max-lg:h-56 max-md:w-48 max-md:h-48'
                            />
                            <div className='flex flex-col items-start'>
                                <h2 className='styleImage-h2'>Shapewear</h2>
                                <h3 className='styleImage-h3'>Uppto 45% off</h3>
                            </div>
                        </Link>
                        <Link href={'/products'}>
                            <div className='w-80 h-80 rounded-2xl max-sm:w-28 max-sm:h-28 max-xl:w-72 max-xl:h-72 max-lg:w-56 max-lg:h-56 max-md:w-48 max-md:h-48 bg-[url(https://res.cloudinary.com/dcxdcs6l4/image/upload/v1687591188/P_1_lkfuj9.jpg)] bg-cover bg-center'></div>
                            <div className='flex flex-col items-start'>
                                <h2 className='styleImage-h2'>Lingerie set</h2>
                                <h3 className='styleImage-h3'>Uppto 50% off</h3>
                            </div>
                        </Link>
                        <Link href={'/products'}>
                            <img
                                src="https://images-cdn.ubuy.co.in/63af77d1dafa164b16490083-women-racerback-sports-bras-high-impact.jpg"
                                alt="yoga"
                                className='w-80 h-80 rounded-2xl max-sm:w-28 max-sm:h-28 max-xl:w-72 max-xl:h-72 max-lg:w-56 max-lg:h-56 max-md:w-48 max-md:h-48'
                            />
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