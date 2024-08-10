import PropTypes from 'prop-types';
import ProductsPageLayout from '@/src/components/ProductsPage/ProductsPageLayout';
import { useState } from 'react';
import { Oval } from 'react-loader-spinner';


export default function Home({ products }) {
  return (
    <>
      {!products &&
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <Oval color="#ff197d" secondaryColor="#ffb1d3" height={80} width={80} />
        </div>
      }

      {products &&
        <ProductsPageLayout products={products} />
      }

    </>
  );
}

Home.propTypes = {
  products: PropTypes.array,
};

export const getServerSideProps = async () => {
  try {
    const res = await fetch(process.env.GET_LAYOUT_PRODUCT_API_URL);

    if (res.ok) {
      const products = await res.json();
      return {
        props: {
          products,
        },
      };
    } else {
      console.error('Failed to fetch products:', res.status, res.statusText);
      return {
        props: {
          products: [],
        },
      };
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      props: {
        products: [],
      },
    };
  }
};
