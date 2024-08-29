import React from 'react';
import PropTypes from 'prop-types';
import ProductsPageLayout from '@/src/components/ProductsPage/ProductsPageLayout';
import { Oval } from 'react-loader-spinner';

const Subcategory = ({ products }) => {
    return (
        <>
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
