import React from 'react'

const StyleImageGrid = () => {
    return (
        <>
            <div
                className="styleImage-container"
                style={{
                    backgroundImage:
                        'url("https://res.cloudinary.com/dcxdcs6l4/image/upload/v1687769042/photo-1594616091971-bf856a77b57d_qsbj3i.jpg")',
                }}
            >
                <h1>Endless allure, intimate styles galore.</h1>

                <div className="styleImage-grid">
                    <div className="styleImage-item">
                        <img
                            src="https://images-cdn.ubuy.co.id/638530bd8711e01d03428e4a-cewany-lady-comfort-sexy-bra-front.jpg"
                            alt="bra"
                        />
                        <h2>Bras</h2>
                        <h3>Uppto 50% off</h3>
                    </div>
                    <div className="styleImage-item">
                        <img
                            src="https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/6/9/tr:w-270,/698ecb8PN2854W22_2.jpg?rnd=20200526195200"
                            alt="panties"
                        />
                        <h2>Panties</h2>
                        <h3>Uppto 50% off</h3>
                    </div>
                    <div className="styleImage-item">
                        <img
                            src="https://m.media-amazon.com/images/I/71axldpOndL._AC_UY1100_.jpg"
                            alt="activewear"
                        />
                        <h2>Activewear</h2>
                        <h3>Uppto 50% off</h3>
                    </div>
                    <div className="styleImage-item">
                        <img
                            src="https://res.cloudinary.com/dcxdcs6l4/image/upload/v1687779353/-473Wx593H-463739011-beige-MODEL2_qh2tef.jpg"
                            alt="shapewear"
                        />
                        <h2>Shapewear</h2>
                        <h3>Uppto 50% off</h3>
                    </div>
                    <div className="styleImage-item">
                        <img
                            src="https://res.cloudinary.com/dcxdcs6l4/image/upload/v1687591188/P_1_lkfuj9.jpg"
                            alt="lingerie set"
                        />
                        <h2>Lingerie set</h2>
                        <h3>Uppto 50% off</h3>
                    </div>
                    <div className="styleImage-item">
                        <img
                            src="https://images-cdn.ubuy.co.in/63af77d1dafa164b16490083-women-racerback-sports-bras-high-impact.jpg"
                            alt="yoga"
                        />
                        <h2>Yoga</h2>
                        <h3>Uppto 50% off</h3>
                    </div>
                </div>
            </div>
        </>
    );
}

export default StyleImageGrid