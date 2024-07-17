import React from 'react';
import { useNavigate } from 'react-router-dom';

const GiftButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    // 로그인 상태 확인 로직 추가 필요
    const isLoggedIn = true; // 예시를 위한 임시 값

    if (isLoggedIn) {
      navigate('/order');
    } else {
      navigate('/login');
    }
  };

  return <button onClick={handleClick}>나에게 선물하기</button>;
};

export default GiftButton;
