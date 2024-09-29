import ProductDetails from '@/src/components/ProductsPage/ProductsPageComponents/ProductDetails';
import React from 'react';
import { useRouter } from 'next/router';
import { Oval } from 'react-loader-spinner';

const ProductPage = () => {
  const { query } = useRouter();
  console.log(query);
  
  const productSlug = query.product || ''; // This should contain the product name and color from the URL
  const extractedId = productSlug.split('-').pop(); // Get the last part as the ID

  // Use the color from the query if it exists, otherwise fallback to color extracted from slug
  const extractedColor = query.color 
    ? query.color.split("?")[0].replace(/-/g, ' ') // Replace hyphens back to spaces
    : 'black'; // Fallback to color extracted from slug and replace hyphens

    console.log(extractedId, extractedColor);



  if (!extractedId) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <Oval color="#ff197d" secondaryColor="#ffb1d3" height={80} width={80} />
      </div>
    );
  }

  return (
    <div>
      <ProductDetails product_id={extractedId} color={extractedColor} />
    </div>
  );
};

export default ProductPage;