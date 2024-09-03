import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaCaretRight } from 'react-icons/fa'

const NewArrivals = () => {
    return (
        <div className="NewArrivalsContainer">
            <h1>New Arrivals</h1>
            <h2>Fresh Fits for Fabulous You!</h2>
            <div className="NewImageGridRow">
                <div className="NewImageContainer">
                    <div className="NewImageWrapper">
                        <Image
                            src="/Images/ExclusiveDesigns&dealsWP/newbra1.webp"
                            alt="discountImage"
                            layout='fill'
                            className="NewImageStyle"
                        />
                        <div className="NewImageTextOverlay">
                            <Link href="/products">
                                <p className="NewImageTextStyle flex items-center gap-1">
                                    Mystic Town
                                    <FaCaretRight
                                        style={{ verticalAlign: "middle" }}
                                        color="yellow"
                                    />
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="NewImageContainer">
                    <div className="NewImageWrapper">
                        <Image
                            src="/Images/ExclusiveDesigns&dealsWP/newbra2.webp"
                            alt="discountImage"
                            layout='fill'
                            className="NewImageStyle"
                        />
                        <div className="NewImageTextOverlay">
                            <Link href="/products">
                                <p className="NewImageTextStyle flex items-center gap-1">
                                    Disney 100{" "}
                                    <FaCaretRight
                                        style={{ verticalAlign: "middle" }}
                                        color="yellow"
                                    />
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="NewImageContainer">
                    <div className="NewImageWrapper">
                        <Image
                            src="/Images/ExclusiveDesigns&dealsWP/newbra3.webp"
                            alt="discountImage"
                            layout='fill'
                            className="NewImageStyle"
                        />
                        <div className="NewImageTextOverlay">
                            <Link href="/products">
                                <p className="NewImageTextStyle flex items-center gap-1">
                                    Star Wars
                                    <FaCaretRight
                                        style={{ verticalAlign: "middle" }}
                                        color="yellow"
                                    />
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewArrivals