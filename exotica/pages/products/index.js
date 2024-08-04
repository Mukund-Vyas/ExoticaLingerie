import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import Layout from "@/src/components/common/Layout";
import Loader from '@/src/utils/Loader';

const ProductsPageLayout = dynamic(() => import("@/src/components/ProductsPage/ProductsPageLayout"), {
  loading: () => <Loader />,
  ssr: false,
});

export default function Home({ products }) {
  return (
    <ProductsPageLayout products={products} />
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
