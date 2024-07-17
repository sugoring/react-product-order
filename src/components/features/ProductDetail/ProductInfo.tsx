import { Box, Image, Text } from '@chakra-ui/react';

import type { ProductDetailData } from '@/types';

type ProductInfoProps = {
  productDetail: ProductDetailData;
};

export const ProductInfo = ({ productDetail }: ProductInfoProps) => (
  <Box>
    <Image src={productDetail.imageURL} alt={productDetail.name} />
    <Text>{productDetail.brandInfo.name}</Text>
    <Text>{productDetail.name}</Text>
    <Text>{productDetail.price.sellingPrice.toLocaleString()}원</Text>
  </Box>
);
