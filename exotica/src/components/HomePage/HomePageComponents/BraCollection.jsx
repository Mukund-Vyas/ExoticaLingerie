import React, { useEffect, useState } from 'react';

const BraCollection = () => {
  const [backgroundImageUrl, setBackgroundImageUrl] = useState('');

  useEffect(() => {
    const imageUrl = window.innerWidth > 1024
      ? 'https://free4kwallpapers.com/uploads/originals/2015/08/31/bikini-girl-wallpaper-1920x1080-2.jpg'
      : 'https://img.freepik.com/free-photo/beautiful-woman-wearing-sexy-black-lingerie_144627-23627.jpg?w=740&t=st=1687865141~exp=1687865741~hmac=55c200693d4318292e42b51178e3ab166f14b22653a6c32b049415834dfdae46';

    setBackgroundImageUrl(imageUrl);
  }, []);

  return (
    <div
      className="BraCollection-container"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <div className="Collection-text">
        <h1>
          Summer{" "}
          <span
            style={{
              fontFamily: "Pacifico",
              fontSize: "calc(100% + 30%)",
              fontWeight: "lighter",
            }}
          >
            {" "}
            Collection.
          </span>
        </h1>
        <h3>Discover the latest trends in our summer collection.</h3>
      </div>
    </div>
  );
};

export default BraCollection;