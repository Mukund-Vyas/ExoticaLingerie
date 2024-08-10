import Link from 'next/link';
import React from 'react'

const StoreImageGrid = () => {
    return (
        <div className="imageGridContainer">
            <h1>Exclusive Designs & Deals</h1>
            <div className="imageGridRow">
                <div className="imageContainer">
                    <div className="imageWrapper">
                        <img
                            src="https://res.cloudinary.com/dcxdcs6l4/image/upload/v1687587836/clovia-picture-cotton-rich-padded-non-wired-spacer-cup-t-shirt-bra-1-413186_r5u0ri.jpg"
                            alt="discountImage"
                            className="imageStyle"
                        />
                        <div className="imageTextOverlay">
                            <Link href="/products">
                                <p className="imageTextStyle">Under 599 Store</p>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="imageContainer">
                    <div className="imageWrapper">
                        <img
                            src="https://res.cloudinary.com/dcxdcs6l4/image/upload/v1687592607/goh5bpf8_how-to-buy-a-sports-bra_625x300_28_March_22_uotyo6.jpg"
                            alt="discountImage"
                            className="imageStyle"
                        />
                        <div className="imageTextOverlay">
                            <Link href="/products">
                                <p className="imageTextStyle">Under 699 Store</p>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="imageContainer">
                    <div className="imageWrapper">
                        <img
                            src="https://res.cloudinary.com/dcxdcs6l4/image/upload/v1687590819/51GDlRcxzOS._SX679__hgy6se.jpg"
                            alt="discountImage"
                            className="imageStyle"
                        />
                        <div className="imageTextOverlay">
                            <Link href="/products">
                                <p className="imageTextStyle">Under 799 Store</p>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="imageContainer">
                    <div className="imageWrapper">
                        <img
                            src="https://res.cloudinary.com/dcxdcs6l4/image/upload/v1687591188/P_1_lkfuj9.jpg"
                            alt="discountImage"
                            className="imageStyle"
                        />
                        <div className="imageTextOverlay">
                            <Link href="/products">
                                <p className="imageTextStyle">Under 499 Store</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StoreImageGrid