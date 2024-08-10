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
    const interval = setInterval(goToNextImage, 4000);

    return () => {
      clearInterval(interval);
    };
  }, [goToNextImage]);

  return (
    <div className="carousel">
      <div className="carousel-image-container">
        <Link href={image_url[currentImageIndex]}>
          <img
            className="carousel-image"
            src={images[currentImageIndex]}
            alt={`Slide ${currentImageIndex + 1}`}
          />
        </Link>
      </div>
      <button className="carousel-button prev" onClick={goToPreviousImage}>
        <GrPrevious />
      </button>
      <button className="carousel-button next" onClick={goToNextImage}>
        <GrNext />
      </button>
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <button
            key={"indecator"+index}
            className={`carousel-indicator ${
              index === currentImageIndex ? 'active' : ''
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
