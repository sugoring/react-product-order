import { Box, Container, Spinner, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';
import { useGetProductOptions } from '@/api/hooks/useGetProductOptions';
import { GiftButton } from '@/components/features/ProductDetail/GiftButton';
import { ProductInfo } from '@/components/features/ProductDetail/ProductInfo';
import { ProductOptions } from '@/components/features/ProductDetail/ProductOptions';
import { RouterPath } from '@/routes/path';

export const ProductDetailPage = () => {
  const { productId = '' } = useParams<{ productId: string }>();
  const {
    data: productDetail,
    isLoading: isLoadingDetail,
    isError: isErrorDetail,
  } = useGetProductDetail(productId);
  const {
    data: productOptions,
    isLoading: isLoadingOptions,
    isError: isErrorOptions,
  } = useGetProductOptions(productId);
  const [quantity, setQuantity] = useState(1);

  if (isLoadingDetail || isLoadingOptions) return <Spinner />;
  if (isErrorDetail || isErrorOptions || !productDetail || !productOptions)
    return <Navigate to={RouterPath.home} />;

  const handlePurchase = () => {
    // Handle purchase logic here
  };

  return (
    <Container>
      <Box>
        <ProductInfo productDetail={productDetail} />
        <Text>카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!</Text>
        <ProductOptions
          productOptions={productOptions}
          quantity={quantity}
          setQuantity={setQuantity}
        />
        <GiftButton handlePurchase={handlePurchase} />
      </Box>
    </Container>
  );
};
