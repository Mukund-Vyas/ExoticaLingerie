import React, { useState, useEffect } from 'react';

const Advertising = () => {
    const [backgroundImageUrl, setBackgroundImageUrl] = useState('');

    useEffect(() => {
        const imageUrl = window.innerWidth > 1024
            ? 'https://img.freepik.com/free-photo/beautiful-woman-wearing-sexy-black-lingerie_144627-23627.jpg?w=740&t=st=1687865141~exp=1687865741~hmac=55c200693d4318292e42b51178e3ab166f14b22653a6c32b049415834dfdae46'
            : 'https://free4kwallpapers.com/uploads/originals/2015/08/31/bikini-girl-wallpaper-1920x1080-2.jpg';

        setBackgroundImageUrl(imageUrl);
    }, []);

    return (
        <>
            <div
                className="Advertising-container"
                style={{ backgroundImage: `url(${backgroundImageUrl})` }}
            >
                <div className="Add-text">
                    <h1>
                        Fashion Fusion{" "}
                        <span
                            style={{
                                fontFamily: "Pacifico",
                                fontSize: "calc(100% + 30%)",
                                fontWeight: "lighter",
                            }}
                        >
                            {" "}
                            Revolution.
                        </span>
                    </h1>

                    <h3>Introducing the captivating Primrose Collection.</h3>
                </div>
                {/* <img src="https://res.cloudinary.com/dcxdcs6l4/image/upload/v1687770782/still-life-different-types-bras-outdoors_gqzo3t.jpg" alt="Advertisement"/> */}
            </div>
        </>
    );
}

export default Advertising; 