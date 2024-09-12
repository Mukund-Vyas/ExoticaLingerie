import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GrNext, GrPrevious } from 'react-icons/gr';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Image from 'next/image';
import { useSwipeable } from 'react-swipeable';

const Carousel = ({ images, image_url }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(0); // For tracking the upcoming image

  const intervalRef = useRef(null); // Use ref to store the interval id

  // Function to reset the interval
  const resetInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // Clear the existing interval
    }
    intervalRef.current = setInterval(goToNextImage, 6000); // Set a new interval
  }, []);

  const goToPreviousImage = useCallback(() => {
    setNextImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    }, 300); // Duration of the slide animation (match CSS duration)

    resetInterval(); // Reset the interval when user interacts
  }, [images, resetInterval]);

  const goToNextImage = useCallback(() => {
    setNextImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 300);

    resetInterval();
  }, [images, resetInterval]);

  useEffect(() => {
    resetInterval(); // Set the initial interval on mount

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current); // Clean up on unmount
      }
    };
  }, [resetInterval]);

  // Configure swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: goToNextImage,
    onSwipedRight: goToPreviousImage,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true, // Enable swipe with the mouse for desktop users
  });

  return (
    <div className="relative overflow-hidden">
      <div className="flex justify-center items-center w-full" {...handlers}>
        <Link href={image_url[nextImageIndex]}>
          <div
            className={`relative w-full h-auto `}
          >
            <Image
              src={images[nextImageIndex]} // Use nextImageIndex during animation
              alt={`Slide ${nextImageIndex + 1}`}
              width={1920} // Replace with your image width
              height={666} // Replace with your image height
              priority={nextImageIndex === 0} // Prioritize the first image
              objectFit="cover"
              className="rounded-lg max-md:rounded-md"
            />
          </div>
        </Link>
      </div>

      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-xl p-1 bg-rose-200 rounded-full border-4 border-white shadow-md focus:outline-none hover:bg-rose-400 max-sm:p-0.5 max-md:text-xs max-sm:border-2"
        onClick={goToPreviousImage}
      >
        <GrPrevious />
      </button>

      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-xl p-1 bg-rose-200 rounded-full border-4 border-white shadow-md focus:outline-none hover:bg-rose-400 max-sm:p-0.5 max-sm:text-xs max-sm:border-2"
        onClick={goToNextImage}
      >
        <GrNext />
      </button>

      <div className="absolute bottom-4 max-sm:bottom-2 left-0 right-0 flex justify-center z-10">
        {images.map((_, index) => (
          <button
            key={`indicator-${index}`}
            className={`w-4 h-4 rounded-full md:mx-1 max-md:mx-0.5 max-sm:w-1 max-sm:h-1 ${
              index === currentImageIndex ? 'bg-primary' : 'bg-rose-200'
            }`}
            onClick={() => {
              setNextImageIndex(index); // Set upcoming image
              setTimeout(() => {
                setCurrentImageIndex(index); // Update current image after animation
              }, 300); // Duration of the slide animation (match CSS duration)

              resetInterval(); // Reset interval when clicked
            }}
          ></button>
        ))}
      </div>
    </div>
  );
};

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  image_url: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Carousel;
