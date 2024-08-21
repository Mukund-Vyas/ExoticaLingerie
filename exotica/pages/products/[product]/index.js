import ProductDetails from '@/src/components/ProductsPage/ProductsPageComponents/ProductDetails';
import React from 'react';
import { useRouter } from 'next/router';
import { Oval } from 'react-loader-spinner';

const Home = () => {
  const params = useRouter();

  const { product, color } = params.query
  console.log(product);
  console.log(color);
  
  if (!product) {
    return (
      <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
        <Oval color="#ff197d" secondaryColor="#ffb1d3" height={80} width={80} />
      </div>
    );
  }

  return (
    <div>
      {product && <ProductDetails product_id={product} color={color}/>}
    </div>
  )
}

export default Home