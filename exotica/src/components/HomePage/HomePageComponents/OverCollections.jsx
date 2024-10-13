import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react';
import 'swiper/swiper-bundle.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, EffectCoverflow } from 'swiper/modules';
import 'swiper/swiper-bundle.css';


const OverCollections = () => {
    const categories = [
        { name: "Bras", imageUrl: "/Images/Intiment/bra.webp", link: "/products", discount: "Upto 55% Off" },
        { name: "Panties", imageUrl: "/Images/Intiment/panties.webp" },
        { name: "Activewear", imageUrl: "/Images/Intiment/activeware.webp", link: "/products/Sag%20Lift%20Bra", discount: "Upto 50% Off" },
        { name: "Lingerie set", imageUrl: "/Images/Intiment/Lingerieset.webp", link: "/products/Bikini%20Set", discount: "Upto 30% Off" },
        { name: "Yoga", imageUrl: "/Images/Intiment/yoga.webp", link: "/products/Sport%20Bra", discount: "Upto 60% Off" },
        { name: "Shapewear", imageUrl: "/Images/Intiment/shapewear.webp" },
    ];

    return (
        <div className="md:py-12 max-md:p-6 bg-gray-50 mt-2"
            style={{
                backgroundImage: `url(/Images/Intiment/collection-bg.webp)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <h2 className="text-center font-[Gelasio] md:text-3xl max-md:text-xl font-extrabold text-amber-300 mb-10">
                EXPLORE OUR COLLECTIONS
            </h2>

            {/* Desktop view */}
            <div className="container mx-auto px-20 max-md:hidden">
                <div className="flex gap-10 justify-between px-20">
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className={`relative flex-grow h-[30rem] w-20 rounded-lg overflow-hidden shadow-lg transition-all duration-300 ease-in-out transform hover:flex-grow-[5] group hover:border hover:border-amber-200 hover:rounded-[6rem]`}
                        >
                            <Link className='absolute cursor-pointer inset-0 z-10' href={category.link || "/"} />
                            <div className={`absolute inset-0 rounded-md overflow-hidden shadow-lg group-hover:inset-5 group-hover:mb-16 group-hover:rounded-[5rem]`}
                                style={{
                                    backgroundImage: 'url(/Images/Intiment/image-bg.webp)',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >
                                <Image
                                    src={category.imageUrl}
                                    alt={category.name}
                                    layout="fill"
                                    objectFit="cover"
                                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                                />
                                {/* Black gradient overlay from bottom to top */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent group-hover:hidden"></div>
                            </div>
                            {/* Category Label */}
                            <div className="w-full absolute bottom-3">
                                <h3 className="w-full text-center text-amber-200 text-xl font-[Salsa] uppercase text-shadow-sm group-hover:text-2xl ">{category.name}</h3>
                                <h4 className="hidden w-full text-center text-yellow-400 text-shadow-sm text-2xl group-hover:block">{category.discount || "Comming Soon"}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Swiper for small/medium screens with Coverflow effect */}
            <div className="md:hidden">
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    pagination={{ el: '.custom-pagination', type: 'fraction', clickable: true }}
                    loop={true}
                    modules={[Pagination, EffectCoverflow]}
                    className="mySwiper"
                >
                    {categories.map((category, index) => (
                        <SwiperSlide key={"slide "+index}>
                            <div className="relative flex-shrink-0 justify-center w-full h-96 overflow-hidden shadow-lg transition-transform duration-500 border border-amber-200 rounded-[4rem]">
                                <Link className="absolute cursor-pointer inset-0 z-10" href={category.link || "/"} />
                                <div className={`absolute overflow-hidden inset-5 mb-16 rounded-[3rem]`}
                                    style={{
                                        backgroundImage: 'url(/Images/Intiment/image-bg.webp)',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                >
                                    <Image
                                        src={category.imageUrl}
                                        alt={category.name}
                                        layout="fill"
                                        objectFit="cover"
                                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                                    />
                                    {/* Black gradient overlay from bottom to top */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent group-hover:hidden"></div>
                                </div>
                                {/* Category Label */}
                                <div className="absolute bottom-3 w-full flex flex-col justify-center">
                                    <h3 className="w-full text-center text-amber-200 text-xl font-[Salsa] uppercase text-shadow-sm">{category.name}</h3>
                                    <h4 className="text-center text-yellow-400 text-shadow-sm text-lg">{category.discount || "Coming Soon"}</h4>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className='w-full flex justify-center my-4'>
                    <div className="custom-pagination max-w-10 bg-amber-300 rounded-full flex justify-center"></div>
                </div>
            </div>
        </div>
    );
}

export default OverCollections;
