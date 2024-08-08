import ProductDetails from '@/src/components/ProductsPage/ProductsPageComponents/ProductDetails';
import React from 'react';
import { useRouter } from 'next/router';

const Home = () => {
  const params = useRouter();

  const {product} = params.query
  console.log(product);
  
  return (
    <div>
      <ProductDetails />
    </div>
  )
}

export default Home