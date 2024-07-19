import {
  Box,
  Button,
  Checkbox,
  Image,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';
import { useGetProductOptions } from '@/api/hooks/useGetProductOptions';

const PaymentPage = () => {
  const { productId } = useParams<{ productId: string }>();

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

  const [message, setMessage] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [receipt, setReceipt] = useState(false);

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

  if (isDetailError || isOptionsError || !productDetail) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Text>상품 정보를 불러오는 데 실패했습니다.</Text>
      </Box>
    );
  }

  const handlePayment = () => {
    alert('주문이 완료되었습니다');
  };

  return (
    <Box p={4}>
      <Box mb={4}>
        <label>선물과 함께 보낼 메세지</label>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="메세지를 입력하세요"
        />
      </Box>
      <Box mb={4} borderWidth={1} p={4} borderRadius="md">
        <Image src={productDetail.imageURL} alt="상품 이미지" mb={4} />
        <Text>브랜드: {productDetail.brandInfo.name}</Text>
        <Text>상품명: {productDetail.name}</Text>
        <Text>수량: 1</Text>
      </Box>
      <Box mb={4}>
        <Text mb={2}>결제 수단 선택</Text>
        <RadioGroup onChange={setPaymentMethod} value={paymentMethod}>
          <Stack direction="row">
            <Radio value="creditCard">신용카드</Radio>
            <Radio value="bankTransfer">계좌이체</Radio>
          </Stack>
        </RadioGroup>
      </Box>
      <Box mb={4}>
        <Checkbox isChecked={receipt} onChange={(e) => setReceipt(e.target.checked)}>
          현금영수증 / 소득공제 신청
        </Checkbox>
      </Box>
      <Box mb={4} borderWidth={1} p={4} borderRadius="md">
        <Text>최종 결제 금액</Text>
        <Text>{productDetail.price.sellingPrice.toLocaleString()}원</Text>
      </Box>
      <Button onClick={handlePayment}>결제하기</Button>
    </Box>
  );
};

export default PaymentPage;
