import React, { useState, useEffect, useCallback } from 'react';
import { GrNext, GrPrevious } from 'react-icons/gr';
import PropTypes from 'prop-types';
import Link from 'next/link';

const Carousel = ({ images, image_url }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images]);

  useEffect(() => {
    const interval = setInterval(goToNextImage, 6000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div className="flex justify-center items-center w-full">
        <Link href={image_url[currentImageIndex]}>
          <img
            className="w-full h-auto object-cover"
            src={images[currentImageIndex]}
            alt={`Slide ${currentImageIndex + 1}`}
            loading='lazy'
          />
        </Link>
      </div>
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-2xl p-1 bg-rose-200 rounded-full border-4 border-white shadow-md focus:outline-none hover:bg-rose-400 max-sm:p-0.5 max-sm:text-sm max-sm:border-2"
        onClick={goToPreviousImage}
      >
        <GrPrevious />
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-2xl p-1 bg-rose-200 rounded-full border-4 border-white shadow-md focus:outline-none hover:bg-rose-400 max-sm:p-0.5 max-sm:text-sm max-sm:border-2"
        onClick={goToNextImage}
      >
        <GrNext />
      </button>
      <div className="absolute bottom-4 max-sm:bottom-2 left-0 right-0 flex justify-center z-10">
        {images.map((_, index) => (
          <button
            key={`indicator-${index}`}
            className={`w-4 h-4 rounded-full mx-1 max-sm:w-1 max-sm:h-1 ${
              index === currentImageIndex ? 'bg-[#ff197d]' : 'bg-rose-200'
            }`}
            onClick={() => setCurrentImageIndex(index)}
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
