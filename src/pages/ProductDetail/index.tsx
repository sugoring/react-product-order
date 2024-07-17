import { Alert, AlertIcon, Box, Button, Spinner, Text, VStack } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';
import { useGetProductOptions } from '@/api/hooks/useGetProductOptions';
import ProductDescription from '@/components/features/ProductDetail/ProductDescription';
import ProductImage from '@/components/features/ProductDetail/ProductImage';
import ProductInfo from '@/components/features/ProductDetail/ProductInfo';
import ProductOptions from '@/components/features/ProductDetail/ProductOptions';
import ProductTerms from '@/components/features/ProductDetail/ProductTerms';
import { useAuth } from '@/provider/Auth';

const productDetailPageStyles = css`
  .spinner {
    margin: 20px auto;
  }

  .alert {
    margin: 20px auto;
    width: 100%;
    text-align: center;
  }

  .gift-button {
    width: 100%;
    padding: 12px;
    font-size: 1.2rem;
    background: #000;
    color: white;
    border-radius: 8px;
    &:hover {
      background: #333;
    }
  }

  .product-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 32px;
  }

  .product-info {
    flex: 1;
    max-width: 500px;
  }

  .product-image {
    max-width: 50%;
  }

  .price-box {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 16px;
    padding: 12px 0;
    border-top: 1px solid #e2e2e2;
    font-size: 1.2rem;
    font-weight: bold;
  }
`;

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const auth = useAuth();

  const {
    data: productDetailData,
    isLoading: isDetailLoading,
    isError: isDetailError,
  } = useGetProductDetail(productId || '');
  const {
    data: productOptionsData,
    isLoading: isOptionsLoading,
    isError: isOptionsError,
  } = useGetProductOptions(productId || '');

  const productDetail = productDetailData?.detail;
  const productOptions = productOptionsData || [];

  if (!productId) {
    navigate('/');
    return null;
  }

  if (isDetailLoading || isOptionsLoading) {
    return <Spinner className="spinner" />;
  }

  if (isDetailError) {
    return (
      <Alert status="error" className="alert">
        <AlertIcon />
        상품 정보를 불러오는 데 실패했습니다. 다시 시도해주세요.
      </Alert>
    );
  }

  if (isOptionsError) {
    console.error('옵션 정보를 불러오는 중 오류가 발생했습니다.');
  }

  if (!productDetail) {
    return (
      <Alert status="warning" className="alert">
        <AlertIcon />
        존재하지 않는 상품입니다.
      </Alert>
    );
  }

  const handleGiftClick = () => {
    navigate(auth ? '/order' : '/login');
  };

  return (
    <VStack spacing={4} p={4} alignItems="flex-start" css={productDetailPageStyles}>
      <Box className="product-container">
        <Box className="product-image">
          <ProductImage imageURL={productDetail.imageURL} name={productDetail.name} />
        </Box>
        <Box className="product-info">
          <ProductInfo productDetail={productDetail} />
          <ProductOptions productOptions={productOptions} isError={isOptionsError} />
          <ProductDescription productDetail={productDetail} />
          <ProductTerms productDetail={productDetail} />
          <Box className="price-box">
            <Text>총 결제 금액</Text>
            <Text>{productDetail.price.sellingPrice.toLocaleString()}원</Text>
          </Box>
          <Button className="gift-button" onClick={handleGiftClick}>
            나에게 선물하기
          </Button>
        </Box>
      </Box>
    </VStack>
  );
};

export default ProductDetailPage;
