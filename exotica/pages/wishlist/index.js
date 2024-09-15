import WishlistLayout from '@/src/components/Wishlist/WishlistLayout'
import Head from 'next/head'
import React from 'react'

const index = () => {
    return (
        <>
            <Head>
                <meta property="og:title" content="Exotica Lingerie - Premium Women's Lingerie Online" />
                <meta property="og:local" content="en_US" />
                <meta property="og:site_name" content="Exotica Lingerie" />
                <meta property="og:description" content="Exotica Lingerie offers premium women's lingerie with a wide range of bras, panties, nightwear, shapewear, and swimwear. Shop high-quality lingerie for every occasion." />
                <meta property="og:image" content="https://www.exoticalingerie.in/Images/ogimage.webp" />
                <meta property="og:image:alt" content="Exotica Lingerie - Premium Women's Lingerie" />
                <meta property="og:url" content="https://www.exoticalingerie.in" />
                <meta property="og:type" content="website" />

                <meta name="twitter:title" content="Exotica Lingerie - Premium Women's Lingerie Online" />
                <meta name="twitter:description" content="Exotica Lingerie offers premium women's lingerie with a wide range of bras, panties, nightwear, shapewear, and swimwear. Shop high-quality lingerie for every occasion." />
                <meta name="twitter:image" content="https://www.exoticalingerie.in/Images/ogimage.webp" />
            </Head>
            <WishlistLayout />
        </>
    )
}

export default index