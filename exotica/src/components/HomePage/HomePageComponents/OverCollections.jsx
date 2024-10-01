import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useSwipeable } from 'react-swipeable';

const OverCollections = () => {
    const categories = [
        {
            name: "Bras",
            imageUrl: "/Images/Intiment/bra.webp", // Replace with actual image URL
            bgColor: "bg-teal-500",
            bgSubColor: "bg-orange-500", // Contrast sub-color
            link:"/products"
        },
        {
            name: "Panties",
            imageUrl: "/Images/Intiment/panties.webp",
            bgColor: "bg-pink-500",
            bgSubColor: "bg-yellow-500",
        },
        {
            name: "Activewear",
            imageUrl: "/Images/Intiment/activeware.webp",
            bgColor: "bg-rose-500",
            bgSubColor: "bg-blue-500",
            link:"/products/Sag%20Lift%20Bra",
        },
        {
            name: "Lingerie set",
            imageUrl: "/Images/Intiment/Lingerieset.webp",
            bgColor: "bg-green-500",
            bgSubColor: "bg-cyan-500", 
            link:"/products/Bikini%20Set"
        },
        {
            name: "Yoga",
            imageUrl: "/Images/Intiment/yoga.webp",
            bgColor: "bg-blue-500",
            bgSubColor: "bg-red-500",
            link:"/products/Sport%20Bra"
        },
        {
            name: "Shapewear",
            imageUrl: "/Images/Intiment/shapewear.webp",
            bgColor: "bg-purple-500",
            bgSubColor: "bg-emerald-500"
        },
    ];

    
    const handlers = useSwipeable({
        onSwipedLeft: () => document.getElementById("carousel").scrollBy({ left: 200, behavior: 'smooth' }),
        onSwipedRight: () => document.getElementById("carousel").scrollBy({ left: -200, behavior: 'smooth' })
    });

    return (
        <div className="py-12 bg-gray-50 mt-2"
        style={{
            backgroundImage: `url(/Images/Intiment/CollectionBG.webp)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}
    >
        {/* Heading */}
        <h2 className="text-center md:text-3xl max-md:text-xl font-extrabold text-gray-900 mb-8">
            EXPLORE OUR COLLECTIONS
        </h2>

        <div className="container mx-auto px-20 max-md:hidden">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className={`relative h-96 rounded-lg overflow-hidden shadow-lg bg-gradient-to-b from-transparent to-black/10 ${category.bgColor} bg-light-noise transition-transform duration-300 ease-in-out transform hover:scale-105 group`}
                       >
                            <Link className='absolute cursor-pointer inset-0 z-10'  href={category.link || "/"}/>
                            <div className={`absolute inset-7 rounded-md overflow-hidden shadow-lg bg-gradient-to-b from-transparent to-black/10 ${category.bgSubColor} bg-light-noise`}>
                                <img
                                    src={category.imageUrl}
                                    alt={category.name}
                                    className="absolute inset- w-full h-full object-cover transition-opacity duration-300"
                                    
                                />
                            </div>
                            {/* Background image */}
                            

                            {/* Category Label */}
                            <div className="absolute bottom-7 left-8">
                                <h3 className="text-white text-3xl font-bold text-shadow-sm">{category.name}</h3>
                            </div>

                            {/* Darker Shadow for depth on hover */}
                            {/* <div className="absolute inset-0 bg-black/5 shadow-2xl transition-all duration-300 group-hover:bg-black/10"></div> */}
                        </div>
                    ))}
                </div>
            </div>
        {/* Swipeable Category Slider for small/medium screens */}
        <div {...handlers} className="relative overflow-hidden md:hidden">
            <div
                id="carousel"
                className="flex gap-6 px-6 overflow-x-scroll no-scrollbar scroll-snap-x-mandatory no-scrollbar"
                style={{
                    scrollPadding: '0 50vw',
                }}
            >
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className={`relative flex-shrink-0 w-[70vw] h-80 rounded-md overflow-hidden shadow-lg bg-gradient-to-b from-transparent to-black/10 ${category.bgColor}`}
                    >
                        <Link className='absolute cursor-pointer inset-0 z-10'  href={category.link || "/"}/>
                        <div className={`absolute inset-4 rounded-md overflow-hidden shadow-lg bg-gradient-to-b from-transparent to-black/10 ${category.bgSubColor}`}>
                            <Image
                                src={category.imageUrl}
                                alt={category.name}
                                layout="fill"
                                objectFit="cover"
                                className="transition-opacity duration-300"
                            />
                        </div>
                        {/* Category Label */}
                        <div className="absolute bottom-3 left-5">
                            <h3 className="text-white text-xl font-bold text-shadow-sm">{category.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
    )
}

export default OverCollections