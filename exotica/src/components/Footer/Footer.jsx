import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SlLocationPin } from "react-icons/sl";
import logo from '../../../public/Images/logo.png';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
    return (
        <div className="pg-footer">
            <footer className="footer">
                <svg
                    className="footer-wave-svg"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 100"
                    preserveAspectRatio="none"
                >
                    <path
                        className="footer-wave-path"
                        d="M851.8,100c125,0,288.3-45,348.2-64V0H0v44c3.7-1,7.3-1.9,11-2.9C80.7,22,151.7,10.8,223.5,6.3C276.7,2.9,330,4,383,9.8 c52.2,5.7,103.3,16.2,153.4,32.8C623.9,71.3,726.8,100,851.8,100z"
                    ></path>
                </svg>
                <div className="footer-content">
                    <div className="footer-brand-info">
                        <div className="footer-brand-header">
                            <Image
                                src={logo}
                                alt="Logo"
                                height={0}
                                width={0}
                                style={{width:'130px', height: "auto" }}
                            />
                            {/* <img src={logo} alt="Logo" className="footer-logo" /> */}
                            <h1>
                                Exotica Lingerie
                                <sup style={{ fontSize: "calc(100% - 30%)" }}>&reg;</sup>
                            </h1>
                        </div>
                        <div className="footer-brand-disc">
                            <p style={{ fontWeight: "bold" }}>
                                Welcome to Exotica Lingerie, your premier online destination for
                                elegant and alluring intimate apparel. Discover beautifully
                                crafted bras, panties, shapewear, and accessories that celebrate
                                your unique style.
                            </p>

                            <p>
                                Our collection of Bras, shapewear, and sportswear offers
                                versatile options for every occasion. From timeless classics to
                                fashion-forward designs, Exotica Lingerie combines superior
                                craftsmanship with luxurious fabrics for an exquisite
                                experience. Embrace your sensuality and confidence at every
                                stage of life with Exotica Lingerie, where elegance meets
                                passion.
                            </p>
                        </div>
                    </div>

                    <div className="footer-menu">
                        <ul>
                            <li>Categories</li>
                            <li>
                                <Link href="http://localhost:3000/">New Arrivals</Link>
                            </li>
                            <li>
                                <Link href="http://localhost:3000/">Bras</Link>
                            </li>
                            <li>
                                <Link href="http://localhost:3000/">Nightwear</Link>
                            </li>
                            <li>
                                <Link href="http://localhost:3000/">Activewear</Link>
                            </li>
                            <li>
                                <Link href="http://localhost:3000/">Panties</Link>
                            </li>
                            <li>
                                <Link href="http://localhost:3000/">Lingerie Set</Link>
                            </li>
                            <li>
                                <Link href="http://localhost:3000/">Winterwear</Link>
                            </li>
                            <li>
                                <Link href="http://localhost:3000/">Beauty</Link>
                            </li>
                            <li>
                                <Link href="http://localhost:3000/">Lingerie Sale & Offer</Link>
                            </li>
                            <li>
                                <Link href="http://localhost:3000/">Swimwear</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="footer-menu">
                        <ul>
                            <li>Help & Support</li>
                            <li>
                                <Link href="http://localhost:3000/">Contact Us</Link>
                            </li>
                            <li>
                                <Link href="http://localhost:3000/">Shipping Policy</Link>
                            </li>
                            <li>
                                <Link href="/privacy-policy">Privacy Policy</Link>
                            </li>
                            <li>
                                <Link href="/terms-of-use">Terms & Conditions</Link>
                            </li>
                            <li>
                                <Link href="http://localhost:3000/">Returns & Exchange Policy</Link>
                            </li>
                            <li>
                                <Link href="http://localhost:3000/">Track your Order</Link>
                            </li>
                            <li>
                                <Link href="http://localhost:3000/">Discreet Packaging</Link>
                            </li>
                            <li>
                                <Link href="http://localhost:3000/">Payment Policy</Link>
                            </li>
                            <li>
                                <Link href="http://localhost:3000/">Customer Support</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="footer-menu">
                        <ul>
                            <li>Quick Links</li>
                            <li>
                                <Link href="http://localhost:3000/">About Exotica Lingerie</Link>
                            </li>
                            <li>
                                <Link href="http://localhost:3000/">Blogs</Link>
                            </li>
                            <li>
                                <Link href="http://localhost:3000/">Find Your Fit</Link>
                            </li>
                            <li>
                                <Link href="http://localhost:3000/">Bra Size Calculator</Link>
                            </li>
                            <li>
                                <Link href="http://localhost:3000/">Shop By Sizes</Link>
                            </li>
                            <li>
                                <Link href="http://localhost:3000/">Shop By Colours</Link>
                            </li>
                            <li>
                                <Link href="http://localhost:3000/">FAQs</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="horizontal-line"></div>

                    <div className="footer-contact-details">
                        <div className="location">
                            <h1 className='flex gap-2 items-center'>
                                <SlLocationPin /> Office Address
                            </h1>
                            <p>Hiral Enterprise</p>
                            <p>108, Shriji Nagar - 2, Opp. Mad Over Grill, Ved Road</p>
                            <p>Surat - 395004</p>
                            <br />
                            <p>
                                <span style={{ fontWeight: "bold" }}>Email :</span>{" "}
                                <Link href="mailto:support@exoticalingerie.in">
                                    support@exoticalingerie.in
                                </Link>
                            </p>
                        </div>

                        <div className="newslatter">
                            <h1><span>Subscribe to</span> Our Newsletter</h1>
                            <p>
                                Stay connected. Be the first to discover our newest arrivals and exclusive promotions
                            </p>

                            <div className="form-group">
                                <div className="input-group">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Enter your email address"
                                        required
                                    />
                                    <button type="submit">Subscribe</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="horizontal-line"></div>

                    <div className="footer-payment-method">
                        <h1>Pay Using</h1>
                        <br />
                        <img src="https://res.cloudinary.com/dcxdcs6l4/image/upload/v1687520285/payments_erd3bs.png" alt="Payment Methods" />
                    </div>

                    <div className="footer-social-links">
                        {" "}
                        <svg
                            className="footer-social-amoeba-svg"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 236 54"
                        >
                            <path
                                className="footer-social-amoeba-path"
                                d="M223.06,43.32c-.77-7.2,1.87-28.47-20-32.53C187.78,8,180.41,18,178.32,20.7s-5.63,10.1-4.07,16.7-.13,15.23-4.06,15.91-8.75-2.9-6.89-7S167.41,36,167.15,33a18.93,18.93,0,0,0-2.64-8.53c-3.44-5.5-8-11.19-19.12-11.19a21.64,21.64,0,0,0-18.31,9.18c-2.08,2.7-5.66,9.6-4.07,16.69s.64,14.32-6.11,13.9S108.35,46.5,112,36.54s-1.89-21.24-4-23.94S96.34,0,85.23,0,57.46,8.84,56.49,24.56s6.92,20.79,7,24.59c.07,2.75-6.43,4.16-12.92,2.38s-4-10.75-3.46-12.38c1.85-6.6-2-14-4.08-16.69a21.62,21.62,0,0,0-18.3-9.18C13.62,13.28,9.06,19,5.62,24.47A18.81,18.81,0,0,0,3,33a21.85,21.85,0,0,0,1.58,9.08,16.58,16.58,0,0,1,1.06,5A6.75,6.75,0,0,1,0,54H236C235.47,54,223.83,50.52,223.06,43.32Z"
                            ></path>
                        </svg>
                        <Link className="footer-social-link linkedin" href="/" target="_blank">
                            <span className="hidden-link-text">Linkedin</span>
                            <FaLinkedin style={{ alignSelf: "center" }} color="#fff" />
                        </Link>
                        <Link className="footer-social-link twitter" href="/" target="_blank">
                            <span className="hidden-link-text">Twitter</span>
                            <FaXTwitter style={{ alignSelf: "center" }} color="#fff" />
                        </Link>
                        <Link
                            className="footer-social-link instagram"
                            href="/"
                            target="_blank"
                        >
                            <span className="hidden-link-text">Instagram</span>
                            <FaInstagram style={{ alignSelf: "center" }} color="#fff" />
                        </Link>
                        <Link className="footer-social-link facebook" href="/" target="_blank">
                            <span className="hidden-link-text">Facebook</span>
                            <FaFacebook color="#fff" />
                        </Link>
                    </div>
                </div>
                <div className="footer-copyright">
                    <div className="footer-copyright-wrapper">
                        <p className="footer-copyright-text">
                            <Link className="footer-copyright-link" href="/" target="_self">
                                &copy; {new Date().getFullYear()} Exotica Lingerie. All rights
                                reserved.
                            </Link>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer