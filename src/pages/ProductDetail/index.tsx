import React from 'react';

import GiftButton from '@/components/features/ProductDetail/GiftButton';
import GiftInfo from '@/components/features/ProductDetail/GiftInfo';
import ProductInfo from '@/components/features/ProductDetail/ProductInfo';
import ProductOptions from '@/components/features/ProductDetail/ProductOptions';

const ProductDetailPage: React.FC = () => {
  const productId = 123; // 예시를 위한 임시 값
  const productData = {
    imageURL: 'https://example.com/image.jpg',
    brand: 'Example Brand',
    name: 'Example Product',
    price: 10000,
    maxQuantity: 10,
  };

  return (
    <div>
      <ProductInfo {...productData} />
      <GiftInfo />
      <ProductOptions maxQuantity={productData.maxQuantity} />
      <GiftButton />
    </div>
  );
};

export default ProductDetailPage;
