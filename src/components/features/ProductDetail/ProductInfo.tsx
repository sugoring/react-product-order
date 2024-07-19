import { Box, HStack, Text } from '@chakra-ui/react';
import { css } from '@emotion/react';

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
  <Box css={productInfoStyles}>
    <Text className="product-name">{productDetail.name}</Text>
    <HStack spacing={4} className="price-container">
      {productDetail.price.basicPrice !== productDetail.price.sellingPrice && (
        <Text className="basic-price">{productDetail.price.basicPrice.toLocaleString()}원</Text>
      )}
      <Text className="selling-price">{productDetail.price.sellingPrice.toLocaleString()}원</Text>
      {productDetail.price.discountRate > 0 && (
        <Text className="discount-rate">{productDetail.price.discountRate}%</Text>
      )}
    </HStack>
    <Text className="brand-name">{productDetail.brandInfo.name}</Text>
  </Box>
);

export default ProductInfo;

const productInfoStyles = css`
  .product-name {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 1rem;
  }

  .price-container {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;

    .basic-price {
      font-size: 1rem;
      text-decoration: line-through;
      color: #999;
    }

    .selling-price {
      font-size: 1.5rem;
      color: #000;
      margin-left: 1rem;
    }

    .discount-rate {
      font-size: 1rem;
      color: #999;
      margin-left: 1rem;
    }
  }

  .brand-name {
    font-size: 1rem;
    color: #999;
    margin-bottom: 1rem;
  }
`;
