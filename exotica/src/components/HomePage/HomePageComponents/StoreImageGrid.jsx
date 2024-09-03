import Link from 'next/link';
import React from 'react'
import Image from 'next/image';

const StoreImageGrid = () => {
    return (
        <div className="imageGridContainer">
            <h1>Exclusive Designs & Deals</h1>
            <div className="imageGridRow">
                <div className="imageContainer">
                    <div className="imageWrapper">
                        <Image
                            src="/Images/ExclusiveDesigns&dealsWP/1.webp"
                            alt="under 599 bra for women"
                            title='under 599 bra for women'
                            layout="fill" 
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
                        <Image
                            src="/Images/ExclusiveDesigns&dealsWP/2.webp"
                            alt="under 699 bra for women"
                            title='under 699 bra for women'
                            layout="fill" 
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
                        <Image
                            src="/Images/ExclusiveDesigns&dealsWP/panties.webp"
                            alt="under 799 bra for women"
                            title='under 799 bra for women'
                            layout="fill"
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
                        <Image
                            src="/Images/ExclusiveDesigns&dealsWP/4.webp"
                            alt="under 499 bra for women"
                            title='under 499 bra for women'
                            layout="fill"
                            className="imageStyle pointer-events-none"
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