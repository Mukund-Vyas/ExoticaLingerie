import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const OverCollections = () => {
    return (
        <div className='w-full flex flex-col gap-5 p-10 max-sm:px-4 bg-purple-100 mt-1'>
            <h2 className='w-full text-center text-4xl max-sm:text-xl font-[Gelasio] font-medium pb-5'>
                EXPLORE OUR COLLECTIONS
            </h2>

            <div className='w-full flex gap-5 max-sm:hidden'>
                <Link href={'/products'} className="relative w-1/2 h-[425px]">
                    {/* Background Image */}
                    <div className="relative w-full h-full">
                        <Image
                            src="/Images/OverCollections/Bras.webp" // Replace with your image path
                            alt="Bras"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>

                    {/* First SVG (Wave Overlay) */}
                    <div className="absolute inset-0">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 900 600"
                            width="100%"
                            height="100%"
                            preserveAspectRatio="none"
                        >
                            <defs>
                                <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                                    <feGaussianBlur in="SourceAlpha" stdDeviation="5" />
                                    <feOffset dy="4" dx="0" result="offsetblur" />
                                    <feFlood floodColor="rgba(0, 0, 0, 0.5)" />
                                    <feComposite in2="offsetblur" operator="in" />
                                    <feMerge>
                                        <feMergeNode />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>
                            <path
                                d="M633 600L625 575C617 550 600 500 610 450C620 400 660 350 685 300C710 250 710 200 695 150C680 100 650 50 635 25L620 0L900 0L900 25C900 50 900 100 900 150C900 200 900 250 900 300C900 350 900 400 900 450C900 500 900 550 900 575L900 600Z"
                                strokeLinecap="round"
                                strokeLinejoin="miter"
                                className='fill-primary'
                                filter="url(#shadow)"
                            />
                        </svg>
                    </div>

                    {/* Second SVG (Line Overlay) */}
                    <div className="absolute inset-0">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 915 600"
                            width="100%"
                            height="100%"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M671 600L678.7 575C686.3 550 701.7 500 698.8 450C696 400 675 350 659.2 300C643.3 250 632.7 200 630.2 150C627.7 100 633.3 50 636.2 25L639 0"
                                fill="none"
                                className='stroke-rose-300'
                                strokeWidth="5"
                                strokeLinecap="round"
                                strokeLinejoin="miter"
                            />
                        </svg>
                    </div>

                    {/* Text Overlay */}
                    <div className="absolute right-5 bottom-1/3 flex flex-col items-end justify-center z-10">
                        <h3 className="text-4xl font-[roboto] uppercase text-white">BRAS</h3>
                        <h4 className="text-xl font-[roboto] text-yellow-200">Upto 55% Off</h4>
                    </div>
                </Link> 

                <div className="relative w-1/2 h-[425px]">
                    {/* Background Image */}
                    <div className="relative w-full h-full">
                        <Image
                            src="/Images/OverCollections/Panties.webp" // Replace with your image path
                            alt="Bras"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>

                    {/* First SVG (Wave Overlay) */}
                    <div className="absolute inset-0">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 900 600"
                            width="100%"
                            height="100%"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M633 600L625 575C617 550 600 500 610 450C620 400 660 350 685 300C710 250 710 200 695 150C680 100 650 50 635 25L620 0L900 0L900 25C900 50 900 100 900 150C900 200 900 250 900 300C900 350 900 400 900 450C900 500 900 550 900 575L900 600Z"
                                strokeLinecap="round"
                                strokeLinejoin="miter"
                                className='fill-primary'
                                filter="url(#shadow)"
                            />
                        </svg>
                    </div>

                    {/* Second SVG (Line Overlay) */}
                    <div className="absolute inset-0">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 915 600"
                            width="100%"
                            height="100%"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M671 600L678.7 575C686.3 550 701.7 500 698.8 450C696 400 675 350 659.2 300C643.3 250 632.7 200 630.2 150C627.7 100 633.3 50 636.2 25L639 0"
                                fill="none"
                                className='stroke-rose-300'
                                strokeWidth="5"
                                strokeLinecap="round"
                                strokeLinejoin="miter"
                            />
                        </svg>
                    </div>

                    {/* Text Overlay */}
                    <div className="absolute right-5 bottom-1/3 flex flex-col items-end justify-center z-10">
                        <h3 className="text-4xl font-[roboto] uppercase text-white">Panties</h3>
                        <h4 className="text-xl font-[roboto] text-yellow-200">Coming Soon</h4>
                    </div>
                </div>
            </div>
            
            <div className='w-full flex sm:hidden max-md:flex-col gap-5 justify-between'>
                <Link href={'/products'} className="relative w-full h-[400px]">
                    {/* Background Image */}
                    <div className="relative w-full h-full border border-primary">
                        <Image
                            src="/Images/Intiment/bra.webp" // Replace with your image path
                            alt="Bras"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>

                    {/* First SVG (Wave Overlay at Bottom) */}
                    <div className="absolute bottom-0 left-0 w-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 900 900" // ViewBox for the first SVG
                            width="100%"
                            height="auto"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M0 744L37.5 752.8C75 761.7 150 779.3 225 790.2C300 801 375 805 450 792C525 779 600 749 675 741.5C750 734 825 749 862.5 756.5L900 764L900 901L862.5 901C825 901 750 901 675 901C600 901 525 901 450 901C375 901 300 901 225 901C150 901 75 901 37.5 901L0 901Z"
                                className='fill-primary'
                                strokeLinecap="round"
                                strokeLinejoin="miter"
                            />
                        </svg>
                    </div>

                    {/* Second SVG (Curved Line Overlay at Bottom) */}
                    <div className="absolute bottom-0 left-0 w-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 900 900" // ViewBox for the second SVG
                            width="100%"
                            height="auto"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M0 783L37.5 776.7C75 770.3 150 757.7 225 759C300 760.3 375 775.7 450 787.8C525 800 600 809 675 797.3C750 785.7 825 753.3 862.5 737.2L900 721"
                                fill="none"
                                className='stroke-rose-300'
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="miter"
                            />
                        </svg>
                    </div>

                    {/* Text Overlay */}
                    <div className="absolute inset-0 p-2 flex items-end justify-between z-10">
                        <h3 className="text-xl font-[roboto] uppercase text-white">BRAS</h3>
                        <h4 className="text-lg font-[roboto] text-yellow-200">Upto 55% off</h4>
                    </div>
                </Link>

                <div className="relative w-full h-[400px]">
                    {/* Background Image */}
                    <div className="relative w-full h-full border border-primary">
                        <Image
                            src="/Images/Intiment/Panty.webp" // Replace with your image path
                            alt="Bras"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>

                    {/* First SVG (Wave Overlay at Bottom) */}
                    <div className="absolute bottom-0 left-0 w-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 900 900" // ViewBox for the first SVG
                            width="100%"
                            height="auto"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M0 744L37.5 752.8C75 761.7 150 779.3 225 790.2C300 801 375 805 450 792C525 779 600 749 675 741.5C750 734 825 749 862.5 756.5L900 764L900 901L862.5 901C825 901 750 901 675 901C600 901 525 901 450 901C375 901 300 901 225 901C150 901 75 901 37.5 901L0 901Z"
                                className='fill-primary'
                                strokeLinecap="round"
                                strokeLinejoin="miter"
                            />
                        </svg>
                    </div>

                    {/* Second SVG (Curved Line Overlay at Bottom) */}
                    <div className="absolute bottom-0 left-0 w-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 900 900" // ViewBox for the second SVG
                            width="100%"
                            height="auto"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M0 783L37.5 776.7C75 770.3 150 757.7 225 759C300 760.3 375 775.7 450 787.8C525 800 600 809 675 797.3C750 785.7 825 753.3 862.5 737.2L900 721"
                                fill="none"
                                className='stroke-rose-300'
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="miter"
                            />
                        </svg>
                    </div>

                    {/* Text Overlay */}
                    <div className="absolute inset-0 p-2 flex items-end justify-between z-10">
                        <h3 className="text-xl font-[roboto] uppercase text-white">PANTIES</h3>
                        <h4 className="text-lg font-[roboto] text-yellow-200">Coming Soon</h4>
                    </div>
                </div>
            </div>
            <div className='w-full flex max-md:flex-col gap-5 justify-between'>
                <Link href={'/products/Sag%20Lift%20Bra'} className="relative w-full h-[400px]">
                    {/* Background Image */}
                    <div className="relative w-full h-full border border-primary">
                        <Image
                            src="/Images/Intiment/activewear.webp" // Replace with your image path
                            alt="Bras"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-md"
                        />
                    </div>

                    {/* First SVG (Wave Overlay at Bottom) */}
                    <div className="absolute bottom-0 left-0 w-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 900 900" // ViewBox for the first SVG
                            width="100%"
                            height="auto"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M0 744L37.5 752.8C75 761.7 150 779.3 225 790.2C300 801 375 805 450 792C525 779 600 749 675 741.5C750 734 825 749 862.5 756.5L900 764L900 901L862.5 901C825 901 750 901 675 901C600 901 525 901 450 901C375 901 300 901 225 901C150 901 75 901 37.5 901L0 901Z"
                                className='fill-primary'
                                strokeLinecap="round"
                                strokeLinejoin="miter"
                            />
                        </svg>
                    </div>

                    {/* Second SVG (Curved Line Overlay at Bottom) */}
                    <div className="absolute bottom-0 left-0 w-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 900 900" // ViewBox for the second SVG
                            width="100%"
                            height="auto"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M0 783L37.5 776.7C75 770.3 150 757.7 225 759C300 760.3 375 775.7 450 787.8C525 800 600 809 675 797.3C750 785.7 825 753.3 862.5 737.2L900 721"
                                fill="none"
                                className='stroke-rose-300'
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="miter"
                            />
                        </svg>
                    </div>

                    {/* Text Overlay */}
                    <div className="absolute inset-0 p-2 flex items-end justify-between z-10">
                        <h3 className="text-xl font-[roboto] uppercase text-white">Activewear</h3>
                        <h4 className="text-lg font-[roboto] text-yellow-200">Upto 50% off</h4>
                    </div>
                </Link>

                <div className="relative w-full h-[400px]">
                    {/* Background Image */}
                    <div className="relative w-full h-full border border-primary">
                        <Image
                            src="/Images/Intiment/shepwear.webp" // Replace with your image path
                            alt="Bras"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-md"
                        />
                    </div>

                    {/* First SVG (Wave Overlay at Bottom) */}
                    <div className="absolute bottom-0 left-0 w-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 900 900" // ViewBox for the first SVG
                            width="100%"
                            height="auto"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M0 744L37.5 752.8C75 761.7 150 779.3 225 790.2C300 801 375 805 450 792C525 779 600 749 675 741.5C750 734 825 749 862.5 756.5L900 764L900 901L862.5 901C825 901 750 901 675 901C600 901 525 901 450 901C375 901 300 901 225 901C150 901 75 901 37.5 901L0 901Z"
                                className='fill-primary'
                                strokeLinecap="round"
                                strokeLinejoin="miter"
                            />
                        </svg>
                    </div>

                    {/* Second SVG (Curved Line Overlay at Bottom) */}
                    <div className="absolute bottom-0 left-0 w-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 900 900" // ViewBox for the second SVG
                            width="100%"
                            height="auto"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M0 783L37.5 776.7C75 770.3 150 757.7 225 759C300 760.3 375 775.7 450 787.8C525 800 600 809 675 797.3C750 785.7 825 753.3 862.5 737.2L900 721"
                                fill="none"
                                className='stroke-rose-300'
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="miter"
                            />
                        </svg>
                    </div>

                    {/* Text Overlay */}
                    <div className="absolute inset-0 p-2 flex items-end justify-between z-10">
                        <h3 className="text-xl font-[roboto] uppercase text-white">Shapewear</h3>
                        <h4 className="text-lg font-[roboto] text-yellow-200">Coming Soon</h4>
                    </div>
                </div>

                <Link href={'/products/Bikini%20Set'} className="relative w-full h-[400px]">
                    {/* Background Image */}
                    <div className="relative w-full h-full border border-primary">
                        <Image
                            src="/Images/Intiment/Lingerieset.webp" // Replace with your image path
                            alt="Bras"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-md bg-white"
                        />
                    </div>

                    {/* First SVG (Wave Overlay at Bottom) */}
                    <div className="absolute bottom-0 left-0 w-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 900 900" // ViewBox for the first SVG
                            width="100%"
                            height="auto"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M0 744L37.5 752.8C75 761.7 150 779.3 225 790.2C300 801 375 805 450 792C525 779 600 749 675 741.5C750 734 825 749 862.5 756.5L900 764L900 901L862.5 901C825 901 750 901 675 901C600 901 525 901 450 901C375 901 300 901 225 901C150 901 75 901 37.5 901L0 901Z"
                                className='fill-primary'
                                strokeLinecap="round"
                                strokeLinejoin="miter"
                            />
                        </svg>
                    </div>

                    {/* Second SVG (Curved Line Overlay at Bottom) */}
                    <div className="absolute bottom-0 left-0 w-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 900 900" // ViewBox for the second SVG
                            width="100%"
                            height="auto"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M0 783L37.5 776.7C75 770.3 150 757.7 225 759C300 760.3 375 775.7 450 787.8C525 800 600 809 675 797.3C750 785.7 825 753.3 862.5 737.2L900 721"
                                fill="none"
                                className='stroke-rose-300'
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="miter"
                            />
                        </svg>
                    </div>

                    {/* Text Overlay */}
                    <div className="absolute inset-0 p-2 flex items-end justify-between z-10">
                        <h3 className="text-xl font-[roboto] uppercase text-white">Lingerie set</h3>
                        <h4 className="text-lg font-[roboto] text-yellow-200">Upto 30% off</h4>
                    </div>
                </Link>

                <Link href={'/products/Sport%20Bra'} className="relative w-full h-[400px]">
                    {/* Background Image */}
                    <div className="relative w-full h-full border border-primary">
                        <Image
                            src="/Images/Intiment/yogabra.webp" // Replace with your image path
                            alt="Bras"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-md"
                        />
                    </div>

                    {/* First SVG (Wave Overlay at Bottom) */}
                    <div className="absolute bottom-0 left-0 w-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 900 900" // ViewBox for the first SVG
                            width="100%"
                            height="auto"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M0 744L37.5 752.8C75 761.7 150 779.3 225 790.2C300 801 375 805 450 792C525 779 600 749 675 741.5C750 734 825 749 862.5 756.5L900 764L900 901L862.5 901C825 901 750 901 675 901C600 901 525 901 450 901C375 901 300 901 225 901C150 901 75 901 37.5 901L0 901Z"
                                className='fill-primary'
                                strokeLinecap="round"
                                strokeLinejoin="miter"
                            />
                        </svg>
                    </div>

                    {/* Second SVG (Curved Line Overlay at Bottom) */}
                    <div className="absolute bottom-0 left-0 w-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 900 900" // ViewBox for the second SVG
                            width="100%"
                            height="auto"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M0 783L37.5 776.7C75 770.3 150 757.7 225 759C300 760.3 375 775.7 450 787.8C525 800 600 809 675 797.3C750 785.7 825 753.3 862.5 737.2L900 721"
                                fill="none"
                                className='stroke-rose-300'
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="miter"
                            />
                        </svg>
                    </div>

                    {/* Text Overlay */}
                    <div className="absolute inset-0 p-2 flex items-end justify-between z-10">
                        <h3 className="text-xl font-[roboto] uppercase text-white">Yoga</h3>
                        <h4 className="text-lg font-[roboto] text-yellow-200">Upto 55% off</h4>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default OverCollections