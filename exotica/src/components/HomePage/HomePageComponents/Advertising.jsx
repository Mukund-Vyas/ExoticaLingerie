import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const Advertising = () => {
    return (
        <div className="relative h-[90vh] mt-1">
            <picture className="absolute inset-0 h-full">
                <source
                    srcSet="/Images/Posters/fashionsmall.webp"
                    media="(max-width: 640px)"
                />
                <Image
                    src="/Images/Posters/fashion.webp"
                    alt="exotica new bra collection"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                    sizes="(max-width: 640px) 100vw, 100vw"  // Sets responsive sizes
                />
            </picture>
            <div className="absolute bottom-8 text-white flex flex-col w-full items-center md:bottom-24">
                <h1 className="text-xl font-bold md:text-5xl">
                    Fashion Fusion
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
                <h3 className="text-sm mt-2 md:text-2xl text-right">Introducing the captivating Primrose Collection.</h3>
            </div>
        </div>
    );
}

export default Advertising; 