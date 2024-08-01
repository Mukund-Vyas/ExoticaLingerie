import React from 'react'
import NavBarLayout from '../NavBar/NavBarLayout'
import Carousel from '../Carousel/Carousel'
import Footer from '../Footer/Footer';
import StoreImageGrid from './HomePageComponents/StoreImageGrid';
import Features from './HomePageComponents/Features';
import StyleImageGrid from './HomePageComponents/StyleImageGrid';
import Advertising from './HomePageComponents/Advertising';
import NewArrivals from './HomePageComponents/NewArrivals';
import BraCollection from './HomePageComponents/BraCollection';
import Layout from '../common/Layout';
import { Toaster } from 'react-hot-toast';

const HomePageLayout = () => {
  const images = [
    'https://cdn.zivame.com/media/mimages/home_page_banner_desktop_1400x550_June_19-03_Desktop.jpg?t=1687121863',
    'https://cdn.zivame.com/media/mimages/home_page_banner_desktop_1400x550_June_19-02_Desktop.jpg?t=1687121515',
    'https://cdn.zivame.com/media/mimages/home_page_banner_desktop_1400x550_June_20-02_Desktop.jpg?t=1687244193',
    'https://cdn.zivame.com/media/mimages/home_page_banner_desktop_1400x550_June2003Desktop1.jpg?t=1687260726',
    'https://cdn.zivame.com/media/mimages/home_page_banner_desktop_1400x550_June_20-01_Desktop.jpg?t=1687216376',
    // Add more image paths here
  ];
  
  const image_url = [
      'http://localhost:3000/',
      'http://localhost:3000/',
      'http://localhost:3000/',
      'http://localhost:3000/',
      'http://localhost:3000/',
  ]

  return (
    <div>
        <div><Toaster position="bottom-center" reverseOrder={false} /></div>
        <Carousel images={images} image_url = {image_url}/>
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