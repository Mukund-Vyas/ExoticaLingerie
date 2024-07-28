import { useState, useEffect } from 'react';
import { FaShippingFast } from 'react-icons/fa';
import { Ri24HoursFill } from 'react-icons/ri';
import { HiBadgeCheck } from 'react-icons/hi';
import { AiOutlineCheckCircle } from 'react-icons/ai'; // Imported LuPackageCheck as AiOutlineCheckCircle
import { RiShoppingBagLine } from 'react-icons/ri'; // Imported LuShoppingBag as RiShoppingBagLine
import { GiCycle } from 'react-icons/gi';

const Features = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const icons = [
    [<AiOutlineCheckCircle />, <FaShippingFast />, <RiShoppingBagLine />], // Replaced LuPackageCheck with AiOutlineCheckCircle and LuShoppingBag with RiShoppingBagLine
    [<Ri24HoursFill />, <HiBadgeCheck />, <GiCycle />]
  ];
  const texts = [
    ['Discreet Packaging', 'Free Shipping', 'Discreet Pick-up'],
    ['Dispatch in 24 Hours', 'Pure Quality', 'Easy Exchange & Return'] // Corrected spelling of "Essy" to "Easy"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % icons.length);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [icons.length]);

  return (
    <div className="carousel-container">
      {icons.map((slideIcons, slideIndex) => (
        <div key={slideIndex} className={`carousel-slide ${slideIndex === activeIndex ? 'active' : ''}`}>
          <div className="icon-container">
            {slideIcons.map((icon, iconIndex) => (
              <div key={iconIndex} className= {iconIndex < slideIcons.length - 1 ? "icon-item bordr" : "icon-item"}>
                <div className="icon">{icon}</div>
                <div className="text" >{texts[slideIndex][iconIndex]}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Features;
