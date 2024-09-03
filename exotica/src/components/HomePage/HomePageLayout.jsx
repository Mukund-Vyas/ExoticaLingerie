import React, { useEffect, useState } from 'react';
import Carousel from '../Carousel/Carousel';
import StoreImageGrid from './HomePageComponents/StoreImageGrid';
import Features from './HomePageComponents/Features';
import StyleImageGrid from './HomePageComponents/StyleImageGrid';
import Advertising from './HomePageComponents/Advertising';
import NewArrivals from './HomePageComponents/NewArrivals';
import BraCollection from './HomePageComponents/BraCollection';
import { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import Image from 'next/image';

const HomePageLayout = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1080);
    };

    handleResize(); // Check initial screen size
    window.addEventListener('resize', handleResize); // Listen for window resize events

    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup resize event listener
    };
  }, []);

  const images = [
    // 'https://cdn.zivame.com/media/mimages/home_page_banner_desktop_1400x550_June_19-03_Desktop.jpg?t=1687121863',
    // 'https://cdn.zivame.com/media/mimages/home_page_banner_desktop_1400x550_June_19-02_Desktop.jpg?t=1687121515',
    // 'https://cdn.zivame.com/media/mimages/home_page_banner_desktop_1400x550_June_20-02_Desktop.jpg?t=1687244193',
    // 'https://cdn.zivame.com/media/mimages/home_page_banner_desktop_1400x550_June2003Desktop1.jpg?t=1687260726',
    // 'https://cdn.zivame.com/media/mimages/home_page_banner_desktop_1400x550_June_20-01_Desktop.jpg?t=1687216376',
    // 'https://res.cloudinary.com/dcxdcs6l4/image/upload/v1722969538/t7rbvbulfjwefjtyli91.png',
    // 'https://res.cloudinary.com/dcxdcs6l4/image/upload/v1722968314/z6ysp1xgzwyp0hibp7fe.png',
    // 'https://res.cloudinary.com/dcxdcs6l4/image/upload/v1722968316/ihyc7f0rrh1m9aiqsppx.png',
    // 'https://res.cloudinary.com/dcxdcs6l4/image/upload/v1722968660/blisa4vxlhz8nyvjuein.png',
    // 'https://res.cloudinary.com/dcxdcs6l4/image/upload/v1722968749/zuubab4ygo7b0o5vuzig.png',

    // 'https://res.cloudinary.com/dcxdcs6l4/image/upload/v1724571054/mi9hgsialxlcntrdufez.webp',
    // 'https://res.cloudinary.com/dcxdcs6l4/image/upload/v1724571054/ytoyym8gqiri2rvbwdse.webp',
    // 'https://res.cloudinary.com/dcxdcs6l4/image/upload/v1724571053/zfuvpugydlnvz1uktavo.webp',
    // 'https://res.cloudinary.com/dcxdcs6l4/image/upload/v1724571053/gyiv07t9rmhtyhjje21j.webp',
    // 'https://res.cloudinary.com/dcxdcs6l4/image/upload/v1724571053/hng11skkxqf8g0o58nfv.webp',
    // 'https://res.cloudinary.com/dcxdcs6l4/image/upload/v1724571053/wym4hrun6ef0heisq0jh.webp',

    'Images/Posters/1.webp',
    'Images/Posters/2.webp',
    'Images/Posters/3.webp',
    'Images/Posters/4.webp',
    'Images/Posters/5.webp',
    'images/Posters/6.webp',
  ];

  const image_url = [
    '/products',
    '/products',
    '/products',
    '/products',
    '/products',
    '/products',
  ]

  return (
    <div>
      <div><Toaster position="bottom-center" reverseOrder={false} /></div>
      {!isLargeScreen &&
        <div className='flex gap-3 h-24 bg-pink-50 w-screen border-b-4 border-white items-center justify-center overflow-x-scroll'>
          <Link href={"/products"} className='flex flex-col items-center'>
            <div className='relative bg-rose-200 p-6 rounded-full border-4 border-white shadow-md'>
              <Image
                src="/Images/Buttons/13001_hpk_1_ab8vvz.webp"
                alt="Bras"
                layout="fill"
                className='absolute left-0 -top-4 hover:scale-110 pointer-events-none'
              />
            </div>
            <p className='text-xs font-medium font-serif'>Bras</p>
          </Link>
          <Link href={"/products"} className='flex flex-col items-center'>
            <div className='relative bg-emerald-200 p-6 rounded-full border-4 border-white shadow-md'>
              <Image
                src="/Images/Buttons/Active-removebg-preview_b9snwp.webp"
                alt="Panties"
                layout="fill"
                className='absolute left-0 top-1 scale-125 hover:scale-150 pointer-events-none'
              />
            </div>
            <p className='text-xs font-medium font-serif'>Panties</p>
          </Link>
          <Link href={"/products"} className='flex flex-col items-center'>
            <div className='relative bg-orange-200 p-6 rounded-full border-4 border-white shadow-md'>
              <Image
                src="/Images/Buttons/image-removebg-preview_ybtrta.webp"
                alt="Lingerie Set"
                layout="fill"
                className='absolute left-0 -top-2 scale-110 hover:scale-125 pointer-events-none'
              />
            </div>
            <p className='text-xs font-medium font-serif'>Lingerie Set</p>
          </Link>
          <Link href={"/products"} className='flex flex-col items-center'>
            <div className='relative bg-blue-200 p-6 rounded-full border-4 border-white shadow-md'>
              <Image
                src="/Images/Buttons/Active_yvgq4h.webp"
                alt="Lingerie Set"
                layout="fill"
                className='absolute left-0 -top-2 scale-110 hover:scale-125 pointer-events-none'
              />
            </div>
            <p className='text-xs font-medium font-serif'>Shapewear</p>
          </Link>
          <Link href={"/products"} className='flex flex-col items-center'>
            <div className='relative bg-fuchsia-200 p-6 rounded-full border-4 border-white shadow-md'>
              <Image
                src="/Images/Buttons/Offer_umit8e.webp"
                alt="Offer"
                layout="fill"
                className='absolute -left-0 -top-1 scale-110 hover:scale-125 pointer-events-none'
              />
            </div>
            <p className='text-xs font-medium font-serif'>Offers</p>
          </Link>
        </div>
      }
      <Carousel images={images} image_url={image_url} />
      <Features />
      <StoreImageGrid />
      <StyleImageGrid />
      <Advertising />
      <NewArrivals />
      <BraCollection />
      {/* <NavBarLayout />
        
        <Footer /> */}
    </div>
  )
}

export default HomePageLayout