import { Alert, AlertIcon, Box, Button, Image, Text } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';
import { useGetProductOptions } from '@/api/hooks/useGetProductOptions';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import ProductDescription from '@/components/features/ProductDetail/ProductDescription';
import ProductImage from '@/components/features/ProductDetail/ProductImage';
import ProductInfo from '@/components/features/ProductDetail/ProductInfo';
import ProductOptions from '@/components/features/ProductDetail/ProductOptions';
import ProductTerms from '@/components/features/ProductDetail/ProductTerms';
import { useAuth } from '@/provider/Auth';
import { getDynamicPath } from '@/routes/path';

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

  if (!productId || isDetailError) {
    navigate('/');
    return null;
  }

  if (isDetailLoading || isOptionsLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
          alt="Loading"
        />
      </Box>
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
    if (auth) {
      navigate(getDynamicPath.payment(productId));
    } else {
      navigate(getDynamicPath.login());
    }
  };

  return (
    <Box css={pageStyles}>
      <Container
        maxWidth="1200px"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid columns={3} gap={32} style={{ width: '100%' }}>
          <Box className="product-grid-item">
            <ProductImage imageURL={productDetail.imageURL} name={productDetail.name} />
          </Box>
          <Box className="product-grid-item">
            <ProductInfo productDetail={productDetail} />
            <ProductDescription productDetail={productDetail} />
            <ProductTerms productDetail={productDetail} />
          </Box>
          <Box className="product-grid-item">
            <ProductOptions productOptions={productOptions} isError={isOptionsError} />
            <Box className="price-box">
              <Text>총 결제 금액</Text>
              <Text>{productDetail.price.sellingPrice.toLocaleString()}원</Text>
            </Box>
            <Button className="gift-button" onClick={handleGiftClick}>
              나에게 선물하기
            </Button>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductDetailPage;

const pageStyles = css`
  .alert {
    background-color: #f9f9f9;
    color: #333;
    border: 1px solid #ddd;
    border-radius: 0;
  }

  .product-grid-item {
    padding: 16px;
    border: 1px solid #ddd;
    border-radius: 0;
    background-color: #fff;
  }

  .price-box {
    padding: 16px;
    border: 1px solid #ddd;
    border-radius: 0;
    background-color: #f9f9f9;
    margin-top: 16px;
  }

  .gift-button {
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 0;
    margin-top: 16px;
    padding: 12px;
    transition: background-color 0.3s;

    &:hover {
      background-color: #444;
    }
  }
`;
