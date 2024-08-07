import React from 'react'

const ProductDetails = () => {
    const product = {
        productId: "1",
        brandName: "Exotica",
        productTtile: "Nike Invincible",
        price: "499",
        discount: "40",
        color: ["#3d3d3d", "#6300b2"],
        size: ["s", "m", "l", "xl", "xxl"],
        images: {
            "#3d3d3d": [
                "https://res.cloudinary.com/dcxdcs6l4/image/upload/v1696305801/a6lhs6r6sov7pnudqliy.jpg",
                "https://res.cloudinary.com/dcxdcs6l4/image/upload/v1696305802/erlnnbk2ry9seupdfasv.jpg",
                "https://res.cloudinary.com/dcxdcs6l4/image/upload/v1696305802/zqaqgxagxlnltbdxxlsd.jpg",
                "https://res.cloudinary.com/dcxdcs6l4/image/upload/v1696305802/oi3m3ate1ruefoh6z9dt.jpg",
                "https://res.cloudinary.com/dcxdcs6l4/image/upload/v1696305802/aerhmshleixu7ypvrks8.jpg",
            ],
            "#6300b2": [
                "https://res.cloudinary.com/dcxdcs6l4/image/upload/v1696305801/a6lhs6r6sov7pnudqliy.jpg",
                "https://img.tatacliq.com/images/i9/437Wx649H/MP000000016011083_437Wx649H_202301090137451.jpeg",
                "https://res.cloudinary.com/dcxdcs6l4/image/upload/v1696305802/zqaqgxagxlnltbdxxlsd.jpg",
                "https://rukminim2.flixcart.com/image/832/832/xif0q/trouser/y/y/c/38-pro-ss-bk-provogue-original-imaghhsb53hsmphs.jpeg?q=70",
                "https://res.cloudinary.com/dcxdcs6l4/image/upload/v1696305802/aerhmshleixu7ypvrks8.jpg",
            ],
        },
        numrate: 54,
        numrev: 3,
        reviews: [
            {
                user: "011254",
                name: "Karangiya Kuldip",
                rate: 5,
                title: "Best Product",
                comment:
                    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earumminima amet eos alias totam illum obcaecati eveniet aliquam. Cumcommodi necessitatibus voluptate maiores suscipit placeat eos, libero eligendi non quaerat in, sapiente totam repellendus!Provident ut deleniti dolores fuga culpa quia itaque nulla. Porrodolorem omnis similique, est facere et?",
                color: "#6300b2",
                size: "L",
            },
            {
                user: "011254",
                name: "Vyas Mukund",
                rate: 4,
                title: "Extremely Happy",
                comment:
                    "Thank you for delivering on time and maintaining product quality",
                color: "#6300b2",
                size: "s",
            },
            {
                user: "011254",
                name: "Thakor Meet",
                rate: 5,
                title: "Awesome Product",
                comment:
                    "The cloth is of good material. The color is as shown in the picture. All buttons are nicely stitched to the cloth. Collar is hard and gives shape. ",
                color: "#6300b2",
                size: "L",
            },
            {
                user: "011254",
                name: "Patel Meet",
                rate: 5,
                title: "Awesome Product",
                comment:
                    "The cloth is of good material. The color is as shown in the picture. All buttons are nicely stitched to the cloth. Collar is hard and gives shape. ",
                color: "#6300b2",
                size: "L",
            },
            {
                user: "011254",
                name: "Patel Meet",
                rate: 2,
                title: "Awesome Product",
                comment:
                    "The cloth is of good material. The color is as shown in the picture. All buttons are nicely stitched to the cloth. Collar is hard and gives shape. ",
                color: "#6300b2",
                size: "XL",
            },
        ],
    };

    const [activeColor, setActiveColor] = useState(product.color[0]);
    const [activeImg, setActiveImg] = useState(product.images[activeColor][0]);

    const [qty, setQty] = useState(1);
    const handleQty = (action) => {
        if (action === "-") {
            if (qty - 1 >= 0) {
                setQty(qty - 1);
            }
        } else if (action === "+") {
            if (qty + 1 <= 11) {
                setQty(qty + 1);
            }
        } else {
            setQty(qty + 1);
        }
    };

    const [size, setSize] = useState(product.size[0]);

    return (
        <div className="max-sm:p-2 xl:px-48 md:px-16 lg:px-24">
            <div className="flex flex-col justify-between lg:flex-row gap-16 lg:items-start max-sm:gap-4">
                {/* Images Section */}
                <div className="sticky flex max-sm:flex-col gap-6 max-sm:gap-2 lg:w-2/4">
                    <div className="max-sm:hidden sm:visited flex flex-col flex-wrap h-auto">
                        {product.images[activeColor].map((value, index) => {
                            return (
                                <img
                                    key={"Image" + index}
                                    src={value}
                                    alt={"image" + index}
                                    className={
                                        activeImg === value
                                            ? "w-24 rounded-md mb-2 cursor-pointer imgRowMobile border-violet-800 border-2"
                                            : "w-24 rounded-md mb-2 cursor-pointer imgRowMobile opacity-75 border-gray-400 hover:border-2 hover:scale-110"
                                    }
                                    onClick={() => setActiveImg(value)}
                                    role="presentation"
                                />
                            );
                        })}
                    </div>
                    {/* Main Image */}
                    <img
                        src={activeImg}
                        alt=""
                        className="w-4/5 self-center object-cover rounded-xl max-sm:w-full"
                    />
                    {/* For the Mobile Divece Image Gallary */}
                    <div className="max-sm:visited sm:hidden flex flex-row justify-between flex-wrap h-auto">
                        {product.images[activeColor].map((value, index) => {
                            return (
                                <img
                                    key={"Image" + index}
                                    src={value}
                                    alt={"image" + index}
                                    className={
                                        activeImg === value
                                            ? "w-24 rounded-md mb-2 cursor-pointer imgRowMobile border-violet-800 border-2"
                                            : "w-24 rounded-md mb-2 cursor-pointer imgRowMobile opacity-75 border-gray-400 hover:border-2 hover:scale-110"
                                    }
                                    onClick={() => setActiveImg(value)}
                                    role="presentation"
                                />
                            );
                        })}
                    </div>
                </div>
                {/* Product Details */}
                <div className="flex flex-col lg:w-2/4 ">
                    {/* Heading */}
                    <div className="pl-2 border-l-2 border-violet-800">
                        <span className="text-violet-600 font-semibold max-sm:text-sm">
                            {product.brandName}
                        </span>
                        <h2 className="text-3xl font-bold max-sm:text-xl">
                            {product.productTtile}
                        </h2>
                    </div>
                    <p className="text-green-700 mt-2 font-semibold text-justify max-sm:text-xs">
                        Special Price
                    </p>
                    {/* Price */}
                    <div className="flex flex-row items-baseline gap-2">
                        <h6 className="text-3xl font-semibold max-sm:text-2xl">
                            ₹{" "}
                            {Math.ceil(
                                product.price - product.price * (product.discount / 100)
                            )}
                        </h6>
                        <span className="text-lg font-semibold line-through text-gray-400 max-sm:text-sm">
                            ₹ {product.price}
                        </span>
                        <span className="text-green-700 text-2xl font-semibold max-sm:text-lg">
                            {product.discount}% off
                        </span>
                    </div>

                    <div className="flex flex-row gap-2 items-baseline">
                        <span className="flex flex-row items-center gap-1 my-1 py-px px-2 bg-green-700 rounded-md max-w-fit text-white font-semibold max-sm:text-sm">
                            <MdOutlineStar /> 4.5
                        </span>
                        <p className="font-semibold max-sm:text-sm">(251 Reviews)</p>
                    </div>
                    {/* LIne */}
                    <hr className="my-2" />

                    {/* Color */}
                    <div className="flex flex-col">
                        <span className="flex flex-row items-center gap-2 text-violet-800 font-semibold text-xl max-sm:text-lg">
                            <MdColorLens /> Color:
                        </span>
                        <div className="flex flex-row gap-2 pt-3 flex-wrap">
                            {product.color.map((value, index) => {
                                return (
                                    <button
                                        key={"Color" + index}
                                        className={
                                            activeColor === value
                                                ? "p-3 rounded-full cursor-pointer border-white border-double border-5"
                                                : "p-3 rounded-full cursor-pointer border-5 border-white hover:border-gray-500 hover:scale-110"
                                        }
                                        style={{ backgroundColor: value }}
                                        onClick={() => {
                                            setActiveColor(value);
                                            setActiveImg(product.images[activeColor][0]);
                                        }}
                                    ></button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Size */}
                    <div className="flex flex-col mt-4">
                        <span className="flex flex-row items-center gap-2 text-violet-800 font-semibold text-xl max-sm:text-lg">
                            <TbRulerMeasure /> Size:
                        </span>
                        <div className="flex flex-row gap-2 pt-3 flex-wrap">
                            {product.size.map((value, index) => {
                                return (
                                    <button
                                        key={"Size" + index}
                                        className={
                                            size === value
                                                ? "px-3 py-1 rounded-full cursor-pointer font-semibold border-2 border-gray-400 product-size-active max-sm:text-xs"
                                                : "px-3 py-1 rounded-full cursor-pointer border-2 border-gray-400 max-sm:text-xs"
                                        }
                                        onClick={() => setSize(value)}
                                    >
                                        {value.toUpperCase()}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Line */}
                    <hr className="my-3" />

                    {/* Quantity */}
                    <div className="flex flex-row flex-wrap items-center gap-6">
                        <span className="flex flex-row items-center gap-2 text-violet-800 font-semibold text-xl max-sm:text-lg">
                            <FaBoxes /> Quantity:
                        </span>
                        <div className="flex flex-row items-center">
                            <button
                                className="bg-gray-200 py-2 px-2 rounded-lg text-violet-800 text-2xl max-sm:text-lg"
                                onClick={() => handleQty("-")}
                            >
                                <BiMinus />
                            </button>
                            <span className="py-4 px-3 rounded-lg max-sm:text-sm">{qty}</span>
                            <button
                                className="bg-gray-200 py-2 px-2 rounded-lg text-violet-800 text-2xl max-sm:text-lg"
                                onClick={() => handleQty("+")}
                            >
                                <BiPlus />
                            </button>
                        </div>
                    </div>

                    {/* Add to Cart & Add to Whishlist */}
                    <div className="flex flex-row flex-wrap items-center gap-6 my-4">
                        <button className="flex flex-row gap-1 items-center bg-white text-green-800 border-2 border-green-800 font-semibold py-2.5 px-10 rounded-lg h-full max-sm:px-3 max-sm:text-sm">
                            <FaRegHeart />
                            Add to Whishlist
                        </button>
                        <button className="flex flex-row gap-1 items-center bg-green-800 border-2 border-green-800 text-white font-semibold py-2.5 px-10 rounded-lg h-full max-sm:px-3 max-sm:text-sm">
                            <HiOutlineShoppingCart /> Add to Cart
                        </button>
                    </div>

                    {/* Line */}
                    <hr className="my-3" />

                    {/* Preferances */}
                    <div>
                        <span className="flex flex-row items-center max-sm:text-sm">
                            <FaTruckFast className="pr-2 text-4xl text-gray-500" /> Delivery
                            by{" "}
                            <b className="text-violet-800">
                                &nbsp; 10<sup>th</sup> Oct{" "}
                            </b>
                        </span>
                        <span className="flex flex-row items-center max-sm:text-sm">
                            <HiCash className="pr-2 text-4xl text-gray-500" />
                            <b className="font-semibold">Cash on Delivery |</b>
                            <b className="text-green-800">&nbsp; Available</b>
                            <b className="text-red-800">&nbsp;Not Available</b>
                        </span>
                        <span className="flex flex-row items-center max-sm:text-sm">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                version="1.0"
                                width="27.000000pt"
                                height="27.000000pt"
                                viewBox="0 0 200.000000 200.000000"
                                preserveAspectRatio="xMidYMid meet"
                                className="pr-2.5 text-4xl fill-gray-500"
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
                            <b className="text-violet-800">10 Days Easy Return</b>
                        </span>
                    </div>

                    {/* LIne */}
                    <hr className="my-2" />
                    <ProductDesc />
                </div>
            </div>

            {/* Rating and Reviews */}
            <Reviews
                numRate={product.numrate}
                numRev={product.numrev}
                reviews={product.reviews}
                limit={3}
            />
        </div>
    );
}

export default ProductDetails