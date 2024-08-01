import React, { useEffect, useState } from 'react'
import HeadLine from './NavBarComponents/HeadLine'
import NavMain from './NavBarComponents/NavMain'
import NavMenu from './NavBarComponents/NavMenu'
import NavSmallMain from './NavBarComponents/NavSmallMain'

const NavBarLayout = () => {
  const [isFixed, setIsFixed] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1080);
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsFixed(scrollTop > 0); // If scrolled down, set navbar to fixed
    };

    handleResize(); // Check initial screen size
    window.addEventListener('resize', handleResize); // Listen for window resize events
    window.addEventListener('scroll', handleScroll); // Listen for scroll events

    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup resize event listener
      window.removeEventListener('scroll', handleScroll); // Cleanup scroll event listener
    };
  }, []);


  return (
    <>
      {isLargeScreen ? ( // Render large screen navbar
        <div className={`bg-white z-50 transition-all duration-700 ease-in-out sticky top-0`}>
          <HeadLine title="The Weeked Bash - MIN 45% Discount alive - Shop Now" />
          <NavMain />
          <NavMenu />
        </div>
      ) : ( // Render small screen navbar
        <div className={`bg-white z-50 transition-all duration-300 ease-in-out sticky top-0`}>
          <div className='flex bg-primary h-[25px] w-full items-center justify-center text-center text-white font-bold max-sm:text-[11px] max-sm:h-[20px]'>
            The Weeked Bash - MIN 45% Discount alive - Shop Now
          </div>
          <NavSmallMain />
        </div>
      )}
    </>
    // <div className={`bg-white z-50 transition-all duration-300 ease-in-out ${isFixed ? 'fixed top-0 left-0 right-0' : 'relative'}`}>
    //     <HeadLine title={"The Weeked Bash - MIN 45% Discount alive - Shop Now"}/>
    //     <NavMain />
    //     <NavMenu />
    // </div>
    // <div className={`bg-white z-50 transition-all duration-300 ease-in-out ${isFixed ? 'fixed top-0 left-0 right-0' : 'relative'}`}>
    //   <div className='flex bg-primary h-[25px] w-full items-center justify-center text-center text-white font-bold max-sm:text-[11px] max-sm:h-[20px]'>
    //     The Weeked Bash - MIN 45% Discount alive - Shop Now
    //   </div>
    //   <NavSmallMain />
    // </div>
  )
}

export default NavBarLayout