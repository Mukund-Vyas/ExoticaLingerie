import PropTypes from 'prop-types';
import ProductsPageLayout from '@/src/components/ProductsPage/ProductsPageLayout';
import { Oval } from 'react-loader-spinner';
import Head from 'next/head';


export default function Home({ products }) {
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
      return {
        props: {
          products: [],
        },
      };
    }
  } catch (error) {
    return {
      props: {
        products: [],
      },
    };
  }
};
