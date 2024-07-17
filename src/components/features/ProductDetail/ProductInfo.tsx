import { Box, HStack, Text } from '@chakra-ui/react';
interface ProductDetail {
  name: string;
  price: {
    basicPrice: number;
    sellingPrice: number;
    discountRate: number;
  };
  brandInfo: {
    name: string;
  };
}

interface ProductInfoProps {
  productDetail: ProductDetail;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ productDetail }) => (
  <Box>
    <Text fontSize="2xl" fontWeight="bold">
      {productDetail.name}
    </Text>
    <HStack spacing={4}>
      {productDetail.price.basicPrice !== productDetail.price.sellingPrice && (
        <Text fontSize="lg" textDecoration="line-through">
          {productDetail.price.basicPrice.toLocaleString()}원
        </Text>
      )}
      <Text fontSize="xl" color="red.500">
        {productDetail.price.sellingPrice.toLocaleString()}원
      </Text>
      {productDetail.price.discountRate > 0 && (
        <Text fontSize="md" color="green.500">
          {productDetail.price.discountRate}%
        </Text>
      )}
    </HStack>
    <Text fontSize="md">{productDetail.brandInfo.name}</Text>
  </Box>
);

export default ProductInfo;
