import { Box, Button, Container, Image, Select, Spinner, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';
import { useGetProductOptions } from '@/api/hooks/useGetProductOptions';
import { useAuth } from '@/provider/Auth';
import { getDynamicPath, RouterPath } from '@/routes/path';
import type { ProductOption } from '@/types';

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
  const authInfo = useAuth();
  const [quantity, setQuantity] = useState(1);

  if (isLoadingDetail || isLoadingOptions) return <Spinner />;
  if (isErrorDetail || isErrorOptions || !productDetail || !productOptions)
    return <Navigate to={RouterPath.home} />;

  const handlePurchase = () => {
    if (!authInfo) {
      return window.location.replace(getDynamicPath.login());
    }

    // Handle purchase logic here
  };

  return (
    <Container>
      <Box>
        <Image src={productDetail.imageURL} alt={productDetail.name} />
        <Text>{productDetail.brandInfo.name}</Text>
        <Text>{productDetail.name}</Text>
        <Text>{productDetail.price.sellingPrice.toLocaleString()}원</Text>
        <Text>카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!</Text>
        <Select value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value, 10))}>
          {productOptions.map((option: ProductOption, index: number) => (
            <option key={index} value={option.quantity}>
              {option.quantity}
            </option>
          ))}
        </Select>
        <Button onClick={handlePurchase}>나에게 선물하기</Button>
      </Box>
    </Container>
  );
};
