import { Box, Button, Input, Textarea } from '@chakra-ui/react';
import { useState } from 'react';

const PaymentPage = () => {
  const [message, setMessage] = useState('');

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
      <Button onClick={handlePayment}>결제하기</Button>
    </Box>
  );
};

export default PaymentPage;
