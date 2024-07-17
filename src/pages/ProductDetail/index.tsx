import React from 'react';
import { Navigate, useParams } from 'react-router-dom';

import useGetProductDetail from '@/api/hooks/useGetProductDetail';
import useGetProductOptions from '@/api/hooks/useGetProductOptions';
import GiftButton from '@/components/features/ProductDetail/GiftButton';
import GiftInfo from '@/components/features/ProductDetail/GiftInfo';
import ProductInfo from '@/components/features/ProductDetail/ProductInfo';
import ProductOptions from '@/components/features/ProductDetail/ProductOptions';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const {
    product,
    isLoading: isLoadingDetail,
    isError: isErrorDetail,
  } = useGetProductDetail(productId!);
  const {
    options,
    isLoading: isLoadingOptions,
    isError: isErrorOptions,
  } = useGetProductOptions(productId!);

  if (isLoadingDetail || isLoadingOptions) return <div>로딩 중...</div>;
  if (isErrorDetail || isErrorOptions) return <Navigate to="/" />;

  return (
    <div>
      {product && <ProductInfo {...product} />}
      <GiftInfo />
      {options && <ProductOptions maxQuantity={options.maxQuantity} />}
      <GiftButton />
    </div>
  );
};

export default ProductDetailPage;
