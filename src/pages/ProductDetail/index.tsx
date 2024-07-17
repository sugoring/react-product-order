import { Alert, AlertIcon, Box, Button, Spinner, VStack } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';
import { useGetProductOptions } from '@/api/hooks/useGetProductOptions';
import ProductDescription from '@/components/features/ProductDetail/ProductDescription';
import ProductImage from '@/components/features/ProductDetail/ProductImage';
import ProductInfo from '@/components/features/ProductDetail/ProductInfo';
import ProductOptions from '@/components/features/ProductDetail/ProductOptions';
import ProductTerms from '@/components/features/ProductDetail/ProductTerms';
import { useAuth } from '@/provider/Auth';

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
    return <Spinner />;
  }

  if (isDetailError) {
    return (
      <Alert status="error">
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
      <Alert status="warning">
        <AlertIcon />
        존재하지 않는 상품입니다.
      </Alert>
    );
  }

  const handleGiftClick = () => {
    navigate(auth ? '/order' : '/login');
  };

  return (
    <VStack spacing={4} p={4} alignItems="flex-start">
      <ProductImage imageURL={productDetail.imageURL} name={productDetail.name} />
      <ProductInfo productDetail={productDetail} />
      <Box>
        <ProductOptions productOptions={productOptions} isError={isOptionsError} />
        <ProductDescription productDetail={productDetail} />
        <ProductTerms productDetail={productDetail} />
      </Box>
      <Button onClick={handleGiftClick}>나에게 선물하기</Button>
    </VStack>
  );
};

export default ProductDetailPage;
