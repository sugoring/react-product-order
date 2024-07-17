import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Alert,
  AlertIcon,
  Box,
  Button,
  HStack,
  Image,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';
import { useGetProductOptions } from '@/api/hooks/useGetProductOptions';
import { useAuth } from '@/provider/Auth';
import type { ProductDetailData, ProductOption } from '@/types';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const auth = useAuth();

  const {
    data: productDetail,
    isLoading: isDetailLoading,
    isError: isDetailError,
  } = useGetProductDetail(productId || '');
  const {
    data: productOptions,
    isLoading: isOptionsLoading,
    isError: isOptionsError,
  } = useGetProductOptions(productId || '');

  if (!productId) {
    navigate('/');
    return null;
  }

  if (isDetailLoading || isOptionsLoading) {
    return <Spinner />;
  }

  if (isDetailError || isOptionsError) {
    return (
      <Alert status="error">
        <AlertIcon />
        상품 정보를 불러오는데 실패했습니다. 다시 시도해주세요.
      </Alert>
    );
  }

  if (!productDetail) {
    navigate('/');
    return null;
  }

  const handleGiftClick = () => {
    navigate(auth ? '/order' : '/login');
  };

  return (
    <VStack spacing={4} p={4} alignItems="flex-start">
      {productDetail && productDetail.detail && (
        <Image src={productDetail.detail.imageURL} alt={productDetail.detail.name} />
      )}

      <Box>
        {productDetail && productDetail.detail && (
          <Text fontSize="2xl" fontWeight="bold">
            {productDetail.detail.name}
          </Text>
        )}
        <HStack spacing={4}>
          {productDetail &&
            productDetail.detail &&
            productDetail.detail.price.basicPrice !== productDetail.detail.price.sellingPrice && (
              <Text fontSize="lg" textDecoration="line-through">
                {productDetail.detail.price.basicPrice.toLocaleString()}원
              </Text>
            )}
          {productDetail && productDetail.detail && (
            <Text fontSize="xl" color="red.500">
              {productDetail.detail.price.sellingPrice.toLocaleString()}원
            </Text>
          )}
          {productDetail && productDetail.detail && productDetail.detail.price.discountRate > 0 && (
            <Text fontSize="md" color="green.500">
              {productDetail.detail.price.discountRate}%
            </Text>
          )}
        </HStack>
        {productDetail && productDetail.detail && (
          <Text fontSize="md">{productDetail.detail.brandInfo.name}</Text>
        )}
      </Box>

      <Accordion allowToggle>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left" fontSize="lg" fontWeight="bold">
              옵션
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            {productOptions &&
              productOptions.map((option) => (
                <Text key={option.optionId}>
                  {option.optionName} (+{option.optionPrice.toLocaleString()}원)
                </Text>
              ))}
          </AccordionPanel>
        </AccordionItem>

        {productDetail && productDetail.detail && (
          <>
            <AccordionItem>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontSize="lg" fontWeight="bold">
                  상품 상세 정보
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                {productDetail.detail.productDetailInfo.announcements.map((announcement) => (
                  <Box key={announcement.displayOrder}>
                    <Text fontWeight="bold">{announcement.name}:</Text>
                    <Text>{announcement.value}</Text>
                  </Box>
                ))}
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontSize="lg" fontWeight="bold">
                  상품 설명
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: productDetail.detail.productDescription.displayImage,
                  }}
                />
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontSize="lg" fontWeight="bold">
                  약관
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                {productDetail.detail.productDetailInfo.terms.map((term) => (
                  <Box key={term.displayCode}>
                    <Text fontWeight="bold">{term.title}</Text>
                    <Text>{term.description}</Text>
                  </Box>
                ))}
              </AccordionPanel>
            </AccordionItem>
          </>
        )}
      </Accordion>

      <Button onClick={handleGiftClick}>나에게 선물하기</Button>
    </VStack>
  );
};

export default ProductDetailPage;
