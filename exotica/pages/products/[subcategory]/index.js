import React from 'react';
import PropTypes from 'prop-types';
import ProductsPageLayout from '@/src/components/ProductsPage/ProductsPageLayout';
import { Oval } from 'react-loader-spinner';
import Head from 'next/head';

const Subcategory = ({ products }) => {
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
            {!products && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
                    <Oval color="#ff197d" secondaryColor="#ffb1d3" height={80} width={80} />
                </div>
            )}
            {products && (
                <ProductsPageLayout products={products} />
            )}
        </>
    );
};

Subcategory.propTypes = {
    products: PropTypes.array,
};

export const getServerSideProps = async ({ params }) => {
    const { subcategory } = params;
    console.log(subcategory);

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/subcategory/${subcategory}`);

        if (res.ok) {
            const products = await res.json();

            // Check if products array is empty
            if (products.length === 0) {
                return {
                    redirect: {
                        destination: '/products',
                        permanent: false, // set to true if this should be a permanent redirect
                    },
                };
            }

            return {
                props: {
                    products,
                },
            };
        } else {
            // Redirect if the response is not OK (e.g., 404 or 500 error)
            return {
                redirect: {
                    destination: '/products',
                    permanent: false,
                },
            };
        }
    } catch (error) {
        console.error('Error fetching products:', error);

        // Redirect in case of an error
        return {
            redirect: {
                destination: '/products',
                permanent: false,
            },
        };
    }
};

export default Subcategory;
