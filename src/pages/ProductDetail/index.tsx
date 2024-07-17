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
import type { ProductOption } from '@/types';

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
  const productOptions: ProductOption[] = productOptionsData || [];

  // productId 유효성 검사
  if (!productId) {
    navigate('/');
    return null;
  }

  // 로딩 상태 처리
  if (isDetailLoading || isOptionsLoading) {
    return <Spinner />;
  }

  // 에러 처리
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
    // TODO: 옵션 로딩 실패 시 에러 처리 (예: 기본 옵션 표시, 옵션 선택 기능 비활성화 등)
  }

  // 상품 상세 정보 없음
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
      {/* 상품 이미지 */}
      <Image src={productDetail.imageURL} alt={productDetail.name} />

      {/* 상품 기본 정보 */}
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

      {/* 아코디언 (옵션, 상품 상세 정보, 상품 설명, 약관) */}
      <Accordion allowToggle>
        {/* 옵션 */}
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left" fontSize="lg" fontWeight="bold">
              옵션
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            {productOptions.length > 0 ? (
              productOptions.map((option) => (
                <Text key={option.id}>
                  {option.name} (+{option.price.toLocaleString()}원)
                </Text>
              ))
            ) : (
              <Text>옵션 정보가 없습니다.</Text>
            )}
          </AccordionPanel>
        </AccordionItem>

        {/* 상품 상세 정보 */}
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left" fontSize="lg" fontWeight="bold">
              상품 상세 정보
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            {productDetail.productDetailInfo.announcements.map((announcement) => (
              <Box key={announcement.displayOrder}>
                <Text fontWeight="bold">{announcement.name}:</Text>
                <Text>{announcement.value}</Text>
              </Box>
            ))}
          </AccordionPanel>
        </AccordionItem>

        {/* 상품 설명 */}
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left" fontSize="lg" fontWeight="bold">
              상품 설명
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <div
              dangerouslySetInnerHTML={{ __html: productDetail.productDescription.displayImage }}
            />
          </AccordionPanel>
        </AccordionItem>

        {/* 약관 */}
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left" fontSize="lg" fontWeight="bold">
              약관
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            {productDetail.productDetailInfo.terms.map((term) => (
              <Box key={term.displayCode}>
                <Text fontWeight="bold">{term.title}</Text>
                <Text>{term.description}</Text>
              </Box>
            ))}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      {/* 선물하기 버튼 */}
      <Button onClick={handleGiftClick}>나에게 선물하기</Button>
    </VStack>
  );
};

export default ProductDetailPage;
