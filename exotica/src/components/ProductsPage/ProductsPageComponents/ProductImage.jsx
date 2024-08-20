import { useState } from 'react';

const ProductImage = ({ imageUrl, placeholderUrl }) => {
  const [loading, setLoading] = useState(true);
  console.log(imageUrl);
  

  return (
    <div>
      <img
        src={loading ? placeholderUrl : imageUrl}
        alt="Product"
        onLoad={() => setLoading(false)}
        style={{ display: 'block', width: '100%' }}
      />
    </div>
  );
};

export default ProductImage;
