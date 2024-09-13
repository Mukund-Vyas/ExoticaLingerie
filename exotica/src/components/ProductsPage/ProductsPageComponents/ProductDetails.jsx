import { setProfileOpen } from '@/Redux/Reducers/profileSlice';
import { useCart } from '@/src/contexts/CartContext';
import api from '@/src/utils/api';
import React, { useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaTruckFast } from 'react-icons/fa6';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { HiCash } from 'react-icons/hi';
import { HiOutlineShoppingCart } from 'react-icons/hi2';
import { MdColorLens } from 'react-icons/md';
import { TbRulerMeasure } from 'react-icons/tb';
import { Oval } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import Tooltip from '../../common/Tooltip';
import { VscQuestion } from "react-icons/vsc";
import Image from 'next/image';
import { BsZoomIn } from 'react-icons/bs';
import Head from 'next/head';

const ProductDetails = ({ product_id, color }) => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeColor, setActiveColor] = useState(color);
    const [activeImg, setActiveImg] = useState('');
    const [imageLoading, setImageLoading] = useState(true);
    const [size, setSize] = useState('');
    const { dispatch } = useCart();
    const [isInWishlist, setIsInWishlist] = useState(false);
    const { authToken } = useSelector((state) => state.user);
    const { profileOpen } = useSelector((state) => state.profile);
    const authdispatch = useDispatch();

    const zoomRef = useRef(null);
    const zoomLensRef = useRef(null);
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0, zoomX: 0, zoomY: 0 });
    const [zoomVisible, setZoomVisible] = useState(false);

    // Find the selected variation based on activeColor
    const selectedVariation = product?.variations?.find(v => v.color === activeColor) || {};

    useEffect(() => {
        setImageLoading(true);
    }, [selectedVariation, activeColor]);

    const handleImageLoad = () => {
        setImageLoading(false);
    };

    // useEffect(() => {
    //     const img = new Image();
    //     img.src = activeImg;
    //     img.onload = () => setImageLoading(false);
    //     setImageLoading(true); // Set loading state before the image starts loading

    //     return () => img.onload = null;
    // }, [activeImg]);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const response = await api.get(`/products/${product_id}`);
                setProduct(response.data);

                if (response.data.variations.length > 0) {
                    // Find the variation that matches the activeColor
                    const matchingVariation = response.data.variations.find(v => v.color.toLowerCase() === color.toLowerCase());

                    // If a matching variation is found, set it as active, otherwise default to the first variation
                    if (matchingVariation) {
                        setActiveColor(matchingVariation.color);
                        setActiveImg(matchingVariation.imageUrls[0]);
                        setSize(matchingVariation.size[0]);
                    } else {
                        setActiveColor(response.data.variations[0].color);
                        setActiveImg(response.data.variations[0].imageUrls[0]);
                        setSize(response.data.variations[0].size[0]);
                    }
                }

                setLoading(false);
            } catch (error) {
                toast.error('Failed to fetch product details!');
                setLoading(false);
            }
        };

        fetchProduct();
    }, [product_id, color]);

    useEffect(() => {
        const checkWishlistStatus = async () => {
            try {
                if (product.variations.length > 0) {
                    const response = await api.get(`/wishlist/check/${product._id}/${selectedVariation._id}`, {
                        headers: {
                            'x-auth-token': authToken,
                        },
                    });
                    setIsInWishlist(response.data.inWishlist);
                }
            } catch (error) {
                setIsInWishlist(false);
            }
        };

        if (authToken && product) {
            checkWishlistStatus();
        } else {
            setIsInWishlist(false);
        }
    }, [authToken]);

    if (loading) {
        return <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <Oval color="#ff197d" secondaryColor="#ffb1d3" height={80} width={80} />
        </div>;
    }

    if (!product) {
        return null;
    }

    const handleAddToCart = (variation, size, color) => {
        const discountedPrice = product.price - (product.price * (product.discount / 100));
        const productToAdd = { ...product, variation, size, color, discountedPrice };
        dispatch({ type: 'ADD_TO_CART', payload: productToAdd });

        toast.success('Product added to cart.', {
            style: { border: '1px solid #ff197d', padding: '16px' },
            iconTheme: { primary: 'rgb(15 118 110)', secondary: '#FFFAEE' },
        });
    };

    const addToWishlist = async () => {
        try {
            if (product.variations.length > 0) {
                await api.post('/wishlist', { productId: product._id, variationId: product.variations[0]._id }, {
                    headers: { 'x-auth-token': authToken },
                });
                setIsInWishlist(true);
                toast.success('Product added to wishlist.');
            }
        } catch (error) {
            authdispatch(setProfileOpen({ isOpen: !profileOpen }));
            toast.error('Failed to add product to wishlist. Please Login first');
        }
    };

    const removeFromWishlist = async () => {
        try {
            if (product.variations.length > 0) {
                await api.delete(`/wishlist/${product._id}/${product.variations[0]._id}`, {
                    headers: { 'x-auth-token': authToken },
                });
                setIsInWishlist(false);
                toast.success('Product removed from wishlist.');
            }
        } catch (error) {
            toast.error('Failed to remove product from wishlist.');
        }
    };

    const handleMouseMove = (e) => {
        if (!zoomRef.current || !zoomLensRef.current) return;

        const { top, left, width, height } = zoomRef.current.getBoundingClientRect();
        const lensWidth = zoomLensRef.current.offsetWidth;
        const lensHeight = zoomLensRef.current.offsetHeight;

        let x = e.clientX - left - lensWidth / 2;
        let y = e.clientY - top - lensHeight / 2;

        // Prevent the lens from moving out of the image bounds
        if (x > width - lensWidth) x = width - lensWidth;
        if (x < 0) x = 0;
        if (y > height - lensHeight) y = height - lensHeight;
        if (y < 0) y = 0;

        // Calculate the background position for the zoomed image
        const posX = (x / (width - lensWidth)) * 100;
        const posY = (y / (height - lensHeight)) * 100;

        setZoomPosition({
            x: -x,
            y: -y,
            backgroundPositionX: `${posX}%`,
            backgroundPositionY: `${posY}%`
        });

        zoomLensRef.current.style.left = `${x}px`;
        zoomLensRef.current.style.top = `${y}px`;
        zoomLensRef.current.style.backgroundPosition = `${posX}% ${posY}%`;
    };

    const handleMouseEnter = () => setZoomVisible(true);
    const handleMouseLeave = () => setZoomVisible(false);

    const colorPalette = {
        'maroon': '#821517',
        'light maroon': '#b15970',
        'purple': '#644667',
        'pink': '#da8d97',
        'orange': '#936144',
        'skin': '#e9c3a4',
        'nevy': '#23243f',
        'nevy blue': '#23243f',
        'gray': '#cecac2',
        'white': '#ffffff',
        'green': '#226030',
        'rani': '#b3105c',
        'black': '#2f2f2f',
        'blue': '#000176',
        'sky': '#9cc8eb',
        'skay': '#9cc8eb',
        'red': '#cb0000',
        'light red': '#f26b79',
        'light purple': '#8b5b77',
        'mustard': '#ba6c36',
        'brown': '#8f646e',
        'cream': '#dfb090',
        'mint': '#788d8b',
    };

    const productTitle = `Buy ${product.productname} - ${color}`;
    const productDescription = `Buy ${product.productname} in ${color} at ₹${(product.price - product.price * (product.discount / 100)).toFixed(2)} with ${product.discount}% off. Available in various sizes and colors.`;
    const productUrl = `https://www.exoticalingerie.in/products/item/${product_id}?color=${color}?product=${product.productname}`;
    const ogImageUrl = encodeURI(process.env.NEXT_PUBLIC_Image_URL + "/" + activeImg);
    return (
        <>
            <Head>
                <title>{productTitle}</title>
                <meta name="description" content={productDescription} />
                <meta property="og:title" content={productTitle} />
                <meta property="og:description" content={productDescription} />
                <meta property="og:url" content={productUrl} />
                <meta property="og:image" content={ogImageUrl} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta property="og:type" content="product" />
                <meta property="og:site_name" content="Exotica Lingerie" />
            </Head>
            <div className="py-6 max-sm:p-2 xl:px-48 md:px-16 lg:px-24 bg-pink-50">
                <div><Toaster position="bottom-center" reverseOrder={false} /></div>
                <div className="flex flex-col justify-between lg:flex-row gap-16 lg:items-start max-sm:gap-4">
                    {/* Images Section */}
                    <div className="relative flex flex-col-reverse lg:flex-row gap-6 max-sm:gap-2 lg:w-2/4">
                        <div className="flex lg:flex-col gap-2 h-auto max-lg:w-full max-lg:overflow-x-auto max-lg:scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-thumb-gray-500">
                            {selectedVariation.imageUrls.map((value, index) => (
                                <div
                                    key={"Image" + index}
                                    className={activeImg === value ? "w-20 max-lg:w-14 bg-white rounded-md cursor-pointer pointer-events-none border-primary border-2 transition-transform duration-300" : "w-20 max-lg:w-14 bg-white rounded-md cursor-pointer opacity-75 border-2 border-neutral-300 hover:border-rose-500 hover:scale-110 transition-transform duration-300"}
                                    onClick={() => setActiveImg(value)}
                                >
                                    <Image
                                        src={process.env.NEXT_PUBLIC_Image_URL + "/" + value}
                                        alt={value.split(".")[0]}
                                        width={80}  // Example width
                                        height={80} // Example height
                                        style={{ objectFit: 'cover' }}
                                        className="rounded-md"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>


                        <div
                            className="relative w-full min-h-[10rem] rounded-xl bg-gray flex items-center justify-center"
                        >
                            {/* {imageLoading && (
                            <div className="absolute rounded-xl inset-0 bg-black bg-opacity-20 flex items-center justify-center z-10">
                                <Oval color="#ff197d" secondaryColor="#ffb1d3" height={80} width={80} />
                            </div>
                        )} */}
                            <div
                                className="relative w-full h-full rounded-xl border bg-gray-200 flex items-center justify-center border border-primary shadow-lg"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                onMouseMove={handleMouseMove}
                            >
                                <Image
                                    src={process.env.NEXT_PUBLIC_Image_URL + "/" + activeImg}
                                    alt="Product"
                                    width={800} // Width corresponding to your image
                                    height={1066} // Height according to your image's aspect ratio
                                    className="w-full h-full object-cover rounded-xl"
                                    ref={zoomRef}
                                    priority
                                />
                                {zoomVisible && (
                                    <>
                                        <div
                                            ref={zoomLensRef}
                                            className="absolute w-36 h-48 bg-white bg-opacity-50 border border-gray-300 rounded-xl max-md:hidden cursor-zoom-in"
                                            style={{
                                                backgroundSize: `${zoomRef.current?.offsetWidth * 3}px ${zoomRef.current?.offsetHeight * 3}px`,
                                            }}
                                            title={product.productname}
                                        />
                                        <div
                                            className="absolute top-0 left-full ml-6 w-full h-full bg-no-repeat bg-contain rounded-lg z-10 max-md:hidden border border-slate-500"
                                            style={{
                                                backgroundImage: `url(${encodeURI(process.env.NEXT_PUBLIC_Image_URL + "/" + activeImg)})`,
                                                backgroundSize: `${zoomRef.current?.offsetWidth * 3}px ${zoomRef.current?.offsetHeight * 3}px`,
                                                backgroundPosition: `${zoomPosition.backgroundPositionX} ${zoomPosition.backgroundPositionY}`,
                                                // transform: `translate(${zoomPosition.x}px, ${zoomPosition.y}px)`,
                                            }}
                                        />
                                    </>
                                )}
                            </div>
                            {!zoomVisible && (
                                <div className='absolute text-sm flex gap-2 items-center bg-neutral-800 opacity-70 px-4 py-2 bottom-2 text-zinc-100 rounded-full max-md:hidden'>
                                    <BsZoomIn /> Magnify the beauty
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Product Details */}
                    <div className="flex flex-col lg:w-2/4">
                        {/* Heading */}
                        <div className="pl-2 border-l-2 border-primary">
                            <span className="text-primary font-semibold max-sm:text-sm">
                                {product.brandname}
                            </span>
                            <h2 className="text-2xl font-bold max-sm:text-xl">
                                {product.productname}
                            </h2>
                        </div>
                        <p className="text-green-600 mt-2 font-semibold text-justify max-sm:text-xs">
                            Special Price
                        </p>
                        {/* Price */}
                        <div className="flex flex-row items-baseline gap-2 mb-10 max-sm:mb-4">
                            <h6 className="text-2xl font-semibold max-sm:text-2xl">
                                ₹ {(product.price - product.price * (product.discount / 100)).toFixed(2)}
                            </h6>
                            {
                                product.discount !== 0 && (
                                    <div className='flex gap-2 items-baseline'>
                                        <span className="text-md font-semibold line-through text-gray-400 max-sm:text-sm">
                                            ₹ {product.price.toFixed(2)}
                                        </span>
                                        <span className="text-green-600 text-xl font-semibold max-sm:text-lg">
                                            {product.discount}% off
                                        </span>
                                    </div>
                                )
                            }
                        </div>

                        {/* Color */}
                        <div className="flex flex-col">
                            <span className="flex flex-row items-center gap-2 text-slate-800 font-semibold text-xl max-sm:text-lg">
                                <MdColorLens /> Color:
                            </span>
                            <div className="flex flex-row gap-2 pt-3 flex-wrap">
                                {product.variations.map((variation, index) => {
                                    const colorKey = variation.color.toLowerCase();
                                    const backgroundColor = colorPalette[colorKey] || variation.color;
                                    const backgroundImage = variation.imageUrls.length > 0
                                        ? `url(${encodeURI(process.env.NEXT_PUBLIC_Image_URL + "/" + variation.imageUrls[0])})`
                                        : '';

                                    return (
                                        <div key={"Color Div " + index} className="relative flex flex-col items-center text-xs z-0" style={{ width: '4rem' }}>
                                            <button
                                                className={`w-16 h-20 p-1 rounded-lg cursor-pointer border-2 z-0 ${activeColor === variation.color ? "border-primary" : "border-gray-400 hover:border-primary"
                                                    }`}
                                                style={{
                                                    backgroundColor: backgroundImage ? 'transparent' : backgroundColor,
                                                    backgroundImage: backgroundImage,
                                                    backgroundSize: 'contain', // Ensure the image fits inside the button without overflowing
                                                    backgroundRepeat: 'no-repeat', // Prevent repetition of the image
                                                    backgroundPosition: 'center', // Center the image within the button
                                                    maxWidth: '100%', // Set max width to avoid overflow
                                                    maxHeight: '100%', // Set max height to avoid overflow

                                                }}
                                                onClick={() => {
                                                    setActiveColor(variation.color);
                                                    setActiveImg(variation.imageUrls[0]);
                                                }}
                                                title={variation.color}
                                            ></button>
                                            <span className={`mt-1 text-center ${activeColor === variation.color ? 'visible' : 'invisible'}`} style={{ minHeight: '1rem' }}>
                                                {variation.color}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>

                        </div>

                        {/* Size */}
                        <div className="flex flex-col mt-4 mb-10 max-sm:mb-4">
                            <span className="flex flex-row items-center gap-2 text-slate-800 font-semibold text-xl max-sm:text-lg">
                                <TbRulerMeasure /> Size:
                            </span>
                            <div className="flex flex-row gap-2 pt-3 flex-wrap">
                                {selectedVariation.size.map((value, index) => (
                                    <button
                                        key={"Size" + index}
                                        className={
                                            size === value
                                                ? "px-3 py-1 rounded-full cursor-pointer font-semibold border-2 border-primary text-primary product-size-active max-sm:text-xs"
                                                : "px-3 py-1 rounded-full cursor-pointer border-2 border-gray-400 max-sm:text-xs"
                                        }
                                        onClick={() => setSize(value)}
                                        title={value.toUpperCase()}
                                    >
                                        {value.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Add to Cart & Add to Wishlist */}
                        <div className="flex flex-row flex-wrap items-center gap-6 my-4">
                            <button className="flex flex-row gap-1 items-center bg-white text-primary border-2 border-primary font-semibold py-2.5 px-5 rounded-lg h-full"
                                onClick={() => isInWishlist ? removeFromWishlist() : addToWishlist()}
                                title='Add to Wishlist'
                            >
                                {isInWishlist ? <GoHeartFill /> : <GoHeart />}
                                Add to Wishlist
                            </button>
                            <button
                                className="flex flex-row gap-1 items-center bg-primary text-white font-semibold py-2.5 px-10 rounded-lg h-full max-sm:px-3 max-sm:text-sm"
                                onClick={() => handleAddToCart(selectedVariation, size, activeColor)}
                                title='Add to Cart'
                            >
                                <HiOutlineShoppingCart />
                                Add to Cart
                            </button>
                        </div>
                        {/* Delivery & Payment Info */}
                        <div className="flex flex-col gap-4 mt-8">
                            <div className="flex flex-row gap-2 items-center max-sm:text-sm">
                                <FaTruckFast className="text-2xl text-primary" />
                                <span className="flex gap-1 items-center font-medium text-lg">Free Shipping
                                    <Tooltip content="On a minimum cart value of ₹999">
                                        <VscQuestion />
                                    </Tooltip>
                                </span>

                            </div>
                            <div className="flex flex-row gap-2 items-center max-sm:text-sm">
                                <HiCash className="text-2xl text-primary" />
                                <span className="flex gap-1 items-center font-medium text-lg">Cash on Delivery Available
                                    <Tooltip content="Additional COD charges may apply.">
                                        <VscQuestion />
                                    </Tooltip>
                                </span>
                            </div>
                            <span className="flex flex-row items-center max-sm:text-sm">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    version="1.0"
                                    width="27.000000pt"
                                    height="27.000000pt"
                                    viewBox="0 0 200.000000 200.000000"
                                    preserveAspectRatio="xMidYMid meet"
                                    className="pr-2.5 text-4xl fill-primary"
                                >
                                    <g
                                        transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
                                        stroke="none"
                                    >
                                        <path d="M885 1944 c-158 -25 -313 -86 -432 -169 l-65 -46 -58 56 c-32 30 -61 55 -64 55 -17 0 -56 -26 -61 -39 -8 -26 -65 -343 -65 -362 0 -27 28 -49 63 -49 18 0 103 13 190 29 218 40 237 60 145 157 -49 52 -50 55 -32 69 57 45 164 101 246 128 86 29 103 31 238 31 123 1 157 -3 224 -22 294 -85 516 -323 578 -619 17 -81 19 -117 13 -208 -9 -146 -9 -144 11 -166 22 -25 76 -25 98 0 42 47 46 295 6 446 -29 110 -108 268 -178 357 -127 159 -314 279 -513 328 -82 21 -279 34 -344 24z" />
                                        <path d="M816 1392 c-92 -42 -167 -81 -165 -87 2 -5 81 -45 176 -89 l172 -78 180 82 c99 45 179 86 176 89 -6 11 -340 161 -356 161 -8 0 -90 -35 -183 -78z" />
                                        <path d="M86 1211 c-42 -46 -46 -292 -7 -446 28 -109 117 -284 192 -373 273 -329 746 -434 1128 -252 46 22 113 61 149 86 l64 45 59 -57 c39 -36 65 -54 75 -50 9 3 20 6 24 6 5 0 14 8 19 19 16 28 73 361 67 386 -11 42 -39 44 -229 10 -240 -43 -259 -62 -165 -161 59 -62 62 -54 -44 -120 -130 -80 -302 -121 -466 -111 -115 8 -191 27 -290 73 -221 101 -384 296 -448 534 -17 64 -24 234 -15 342 3 36 0 53 -14 68 -23 26 -76 26 -99 1z" />
                                        <path d="M560 953 l1 -258 182 -83 c100 -45 186 -82 190 -82 4 0 6 115 5 256 l-3 256 -185 84 c-101 46 -185 84 -187 84 -2 0 -3 -116 -3 -257z" />
                                        <path d="M1245 1125 l-180 -83 -3 -256 c-1 -141 1 -256 6 -256 5 0 89 37 188 83 l179 83 3 257 c1 141 -1 257 -5 256 -5 0 -89 -38 -188 -84z" />
                                    </g>
                                </svg>{" "}
                                <b className="text-lg font-medium">7 Days Easy Return</b>
                            </span>
                        </div>

                        {/* Product Description */}
                        <div className="pt-6">
                            <h3 className="text-lg font-semibold">About Product:</h3>
                            {product?.productFeatures?.map((feature, index) => (
                                feature?.description && (
                                    <div key={"feature" + index} className="w-full flex font-[400] my-2 max-sm:text-xs">
                                        <span className="w-1/3 flex items-start text-primary font-semibold">{feature?.title}</span>
                                        <span className="w-2/3 flex items-start">{feature?.description}</span>
                                    </div>
                                )
                            ))}
                            <p className="text-justify">{product.productDescription}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetails