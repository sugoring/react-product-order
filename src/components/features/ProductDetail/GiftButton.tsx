import { Button } from '@chakra-ui/react';

import { useAuth } from '@/provider/Auth';
import { getDynamicPath } from '@/routes/path';

type GiftButtonProps = {
  handlePurchase: () => void;
};

export const GiftButton = ({ handlePurchase }: GiftButtonProps) => {
  const authInfo = useAuth();

  const onClick = () => {
    if (!authInfo) {
      window.location.replace(getDynamicPath.login());
    } else {
      handlePurchase();
    }
  };

  return <Button onClick={onClick}>나에게 선물하기</Button>;
};
