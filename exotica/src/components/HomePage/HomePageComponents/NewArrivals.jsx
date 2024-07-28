import React from 'react'
import { FaCaretRight } from 'react-icons/fa'

const NewArrivals = () => {
    return (
        <>
            <div className="NewArrivalsContainer">
                <h1>New Arrivals</h1>
                <h2>Fresh Fits for Fabulous You!</h2>
                <div className="NewImageGridRow">
                    <div className="NewImageContainer">
                        <div className="NewImageWrapper">
                            <img
                                src="https://res.cloudinary.com/dcxdcs6l4/image/upload/v1687587836/clovia-picture-cotton-rich-padded-non-wired-spacer-cup-t-shirt-bra-1-413186_r5u0ri.jpg"
                                alt="discountImage"
                                className="NewImageStyle"
                            />
                            <div className="NewImageTextOverlay">
                                <a href="http://localhost:3000/">
                                    <p className="NewImageTextStyle">
                                        Mystic Town
                                        <FaCaretRight
                                            style={{ verticalAlign: "middle" }}
                                            color="yellow"
                                        />
                                    </p>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="NewImageContainer">
                        <div className="NewImageWrapper">
                            <img
                                src="https://res.cloudinary.com/dcxdcs6l4/image/upload/v1687592607/goh5bpf8_how-to-buy-a-sports-bra_625x300_28_March_22_uotyo6.jpg"
                                alt="discountImage"
                                className="NewImageStyle"
                            />
                            <div className="NewImageTextOverlay">
                                <a href="http://localhost:3000/">
                                    <p className="NewImageTextStyle">
                                        Disney 100{" "}
                                        <FaCaretRight
                                            style={{ verticalAlign: "middle" }}
                                            color="yellow"
                                        />
                                    </p>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="NewImageContainer">
                        <div className="NewImageWrapper">
                            <img
                                src="https://res.cloudinary.com/dcxdcs6l4/image/upload/v1687590819/51GDlRcxzOS._SX679__hgy6se.jpg"
                                alt="discountImage"
                                className="NewImageStyle"
                            />
                            <div className="NewImageTextOverlay">
                                <a href="http://localhost:3000/">
                                    <p className="NewImageTextStyle">
                                        Star Wars
                                        <FaCaretRight
                                            style={{ verticalAlign: "middle" }}
                                            color="yellow"
                                        />
                                    </p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewArrivals