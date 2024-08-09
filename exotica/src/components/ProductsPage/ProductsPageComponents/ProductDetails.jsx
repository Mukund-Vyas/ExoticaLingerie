import { setProfileOpen } from '@/Redux/Reducers/profileSlice';
import { useCart } from '@/src/contexts/CartContext';
import api from '@/src/utils/api';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { FaBoxes, FaRegHeart } from 'react-icons/fa';
import { FaTruckFast } from 'react-icons/fa6';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { HiCash } from 'react-icons/hi';
import { HiOutlineShoppingCart } from 'react-icons/hi2';
import { MdColorLens, MdOutlineStar } from 'react-icons/md';
import { TbRulerMeasure } from 'react-icons/tb';
import { Oval } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';

const ProductDetails = ({ product_id }) => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeColor, setActiveColor] = useState('');
    const [activeImg, setActiveImg] = useState('');
    const [size, setSize] = useState('');
    const [qty, setQty] = useState(1);
    const { dispatch } = useCart();
    const [isInWishlist, setIsInWishlist] = useState(false);
    const { authToken } = useSelector((state) => state.user);
    const { profileOpen } = useSelector((state) => state.profile);
    const authdispatch = useDispatch();

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const response = await api.get(`/products/${product_id}`);
                setProduct(response.data);

                // Initialize activeColor and size
                if (response.data.variations.length > 0) {
                    setActiveColor(response.data.variations[0].color);
                    setActiveImg(response.data.variations[0].imageUrls[0]);
                    setSize(response.data.variations[0].size[0]);
                }

                setLoading(false);
            } catch (error) {
                toast.error('Failed to fetch product details!');
                setLoading(false);
            }
        };

        fetchProduct();
    }, [product_id]);

    useEffect(() => {
        const checkWishlistStatus = async () => {
            try {
                // Assuming the first variation is used for wishlist check
                if (product.variations.length > 0) {
                    const response = await api.get(`/wishlist/check/${product._id}/${product.variations[0]._id}`, {
                        headers: {
                            'x-auth-token': authToken,
                        },
                    });
                    setIsInWishlist(response.data.inWishlist);
                }
            } catch (error) {
                console.error('Error checking wishlist status:', error);
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
        return null; // Or a fallback UI
    }


    const handleQty = (action) => {
        if (action === "-") {
            if (qty - 1 >= 1) {
                setQty(qty - 1);
            }
        } else if (action === "+") {
            if (qty + 1 <= 12) {
                setQty(qty + 1);
            }
        } else {
            setQty(qty + 1);
        }
    };

    const handleAddToCart = (variation, size) => {
        const discountedPrice = product.price - (product.price * (product.discount / 100));
        console.log(discountedPrice);

        const productToAdd = {
            ...product,
            variation,
            size,
            discountedPrice,
        };
        console.log(productToAdd);

        dispatch({ type: 'ADD_TO_CART', payload: productToAdd });

        toast.success('Product added to cart.', {
            style: {
                border: '1px solid #ff197d',
                padding: '16px',
            },
            iconTheme: {
                primary: 'rgb(15 118 110)',
                secondary: '#FFFAEE',
            },
        });
    };

    const addToWishlist = async () => {
        try {
            if (product.variations.length > 0) {
                await api.post('/wishlist', { productId: product._id, variationId: product.variations[0]._id }, {
                    headers: {
                        'x-auth-token': authToken,
                    },
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
                    headers: {
                        'x-auth-token': authToken,
                    },
                });
                setIsInWishlist(false);
                toast.success('Product removed from wishlist.');
            }
        } catch (error) {
            console.error('Error removing from wishlist:', error);
            toast.error('Failed to remove product from wishlist.');
        }
    };

    // Find the selected variation based on activeColor
    const selectedVariation = product.variations.find(v => v.color === activeColor) || {};

    return (
        <div className="py-10 max-sm:p-2 xl:px-48 md:px-16 lg:px-24 bg-pink-50">
            <div><Toaster position="bottom-center" reverseOrder={false} /></div>
            <div className="flex flex-col justify-between lg:flex-row gap-16 lg:items-start max-sm:gap-4">
                {/* Images Section */}
                <div className="sticky flex max-sm:flex-col gap-6 max-sm:gap-2 lg:w-2/4">
                    <div className="max-sm:hidden sm:visited flex flex-col flex-wrap h-auto">
                        {selectedVariation.imageUrls.map((value, index) => (
                            <img
                                key={"Image" + index}
                                src={value.replace('dl=0', 'raw=1')}
                                alt={"image" + index}
                                className={
                                    activeImg === value
                                        ? "w-24 bg-white rounded-md mb-2 cursor-pointer imgRowMobile border-primary border-2 "
                                        : "w-24 bg-white rounded-md mb-2 cursor-pointer imgRowMobile opacity-75 border-gray-400 hover:border-2 hover:scale-110"
                                }
                                onClick={() => setActiveImg(value)}
                                role="presentation"
                            />
                        ))}
                    </div>
                    {/* Main Image */}
                    <img
                        src={activeImg.replace('dl=0', 'raw=1')}
                        alt={`${product.variations[0]?.color || ''} ${product.productname}`}
                        className="w-4/5 self-center object-cover rounded-xl max-sm:w-full border bg-white border-primary shadow-lg"
                    />
                    {/* For the Mobile Device Image Gallery */}
                    <div className="max-sm:visited sm:hidden flex flex-row justify-between flex-wrap h-auto">
                        {selectedVariation.imageUrls.map((value, index) => (
                            <img
                                key={"Image" + index}
                                src={value.replace('dl=0', 'raw=1')}
                                alt={"image" + index}
                                className={
                                    activeImg === value
                                        ? "w-24 bg-white rounded-md mb-2 cursor-pointer imgRowMobile border-primary border-2"
                                        : "w-24 bg-white rounded-md mb-2 cursor-pointer imgRowMobile opacity-75 border-gray-400 hover:border-2 hover:scale-110"
                                }
                                onClick={() => setActiveImg(value)}
                                role="presentation"
                            />
                        ))}
                    </div>
                </div>
                {/* Product Details */}
                <div className="flex flex-col lg:w-2/4">
                    {/* Heading */}
                    <div className="pl-2 border-l-2 border-primary">
                        <span className="text-primary font-semibold max-sm:text-sm">
                            {product.brandname}
                        </span>
                        <h2 className="text-3xl font-bold max-sm:text-xl">
                            {product.productname}
                        </h2>
                    </div>
                    <p className="text-green-600 mt-2 font-semibold text-justify max-sm:text-xs">
                        Special Price
                    </p>
                    {/* Price */}
                    <div className="flex flex-row items-baseline gap-2">
                        <h6 className="text-3xl font-semibold max-sm:text-2xl">
                            ₹ {Math.ceil(product.price - product.price * (product.discount / 100))}
                        </h6>
                        {
                            product.discount !== 0 && (
                                <div className='flex gap-2 items-baseline'>
                                    <span className="text-lg font-semibold line-through text-gray-400 max-sm:text-sm">
                                        ₹ {product.price}
                                    </span>
                                    <span className="text-green-600 text-2xl font-semibold max-sm:text-lg">
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
                            {product.variations.map((variation, index) => (
                                <button
                                    key={"Color" + index}
                                    className={
                                        activeColor === variation.color
                                            ? "p-3 rounded-full cursor-pointer border-[2px] border-primary border-double"
                                            : "p-3 rounded-full cursor-pointer border-[2px] border-white hover:border-gray-500 hover:scale-110"
                                    }
                                    style={{ backgroundColor: variation.color == "#FFDB58" ? "" : variation.color }}
                                    onClick={() => {
                                        setActiveColor(variation.color);
                                        setActiveImg(variation.imageUrls[0]);
                                    }}
                                ></button>
                            ))}
                        </div>
                    </div>

                    {/* Size */}
                    <div className="flex flex-col mt-4">
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
                                >
                                    {value.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quantity */}
                    <div className="flex flex-row flex-wrap items-center gap-6">
                        <span className="flex flex-row items-center gap-2 text-slate-800 font-semibold text-xl max-sm:text-lg">
                            <FaBoxes /> Quantity:
                        </span>
                        <div className="flex flex-row items-center">
                            <button
                                className="bg-gray-200 py-2 px-2 rounded-lg text-slate-800 text-2xl max-sm:text-lg"
                                onClick={() => handleQty("-")}
                            >
                                <BiMinus />
                            </button>
                            <span className="py-4 px-3 rounded-lg max-sm:text-sm">{qty}</span>
                            <button
                                className="bg-gray-200 py-2 px-2 rounded-lg text-slate-800 text-2xl max-sm:text-lg"
                                onClick={() => handleQty("+")}
                            >
                                <BiPlus />
                            </button>
                        </div>
                    </div>

                    {/* Add to Cart & Add to Wishlist */}
                    <div className="flex flex-row flex-wrap items-center gap-6 my-4">
                        <button className="flex flex-row gap-1 items-center bg-white text-primary border-2 border-primary font-semibold py-2.5 px-5 rounded-lg h-full"
                            onClick={() => isInWishlist ? removeFromWishlist() : addToWishlist()}
                        >
                            {isInWishlist ? <GoHeartFill /> : <GoHeart />}
                            Add to Wishlist
                        </button>
                        <button
                            className="flex flex-row gap-1 items-center bg-primary text-white font-semibold py-2.5 px-10 rounded-lg h-full max-sm:px-3 max-sm:text-sm"
                            onClick={() => handleAddToCart(selectedVariation, size)}
                        >
                            <HiOutlineShoppingCart />
                            Add to Cart
                        </button>
                    </div>
                    {/* Delivery & Payment Info */}
                    <div className="flex flex-col gap-4 mt-8">
                        <div className="flex flex-row gap-2 items-center">
                            <FaTruckFast className="text-2xl text-primary" />
                            <span className="font-semibold text-lg">Free Shipping</span>
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                            <HiCash className="text-2xl text-primary" />
                            <span className="font-semibold text-lg">Cash on Delivery Available</span>
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
                            <b className="">10 Days Easy Return</b>
                        </span>
                    </div>

                    {/* Product Description */}
                    <div className="pt-6">
                        <h3 className="text-lg font-semibold">About Product:</h3>
                        <p className="text-justify">{product.productDescription}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails