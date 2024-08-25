import React, { useEffect, useState } from 'react';

const BraCollection = () => {
  return (
    <div className="relative h-[80vh] mt-1">
      <picture className="absolute inset-0 h-full">
        <source
          srcSet="https://res.cloudinary.com/dcxdcs6l4/image/upload/v1724609742/ygjcq8eu4x3c0ljxzqdi.webp"
          media="(max-width: 640px)"
        />
        <img
          src="https://res.cloudinary.com/dcxdcs6l4/image/upload/v1724607373/ddqpkpqkxnvnl6ij0erk.webp"
          alt="exotica new bra collection"
          className="h-full w-full object-cover"
        />
      </picture>
      <div className="absolute top-8 text-pink-900 flex flex-col w-full items-center md:bottom-24 md:pr-72">
        <h1 className="text-xl font-bold md:text-5xl">
          winter{" "}
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
        <h3 className="text-sm mt-2 md:text-2xl text-right max-sm:text-center">Discover the latest trends in Exotica Lingerie's winter collection.</h3>
      </div>
    </div>
  );
};

export default BraCollection;