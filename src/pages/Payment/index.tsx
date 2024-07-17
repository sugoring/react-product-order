import {
  Box,
  Button,
  Image,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useState } from 'react';

const PaymentPage = () => {
  const [message, setMessage] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('creditCard');

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
        <Image src="product_image_url" alt="상품 이미지" mb={4} />
        <Text>브랜드: 예시 브랜드</Text>
        <Text>상품명: 예시 상품</Text>
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
      <Button onClick={handlePayment}>결제하기</Button>
    </Box>
  );
};

export default PaymentPage;
