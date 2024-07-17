import { Select } from '@chakra-ui/react';

import type { ProductOption } from '@/types';

type ProductOptionsProps = {
  productOptions: ProductOption[];
  quantity: number;
  setQuantity: (quantity: number) => void;
};

export const ProductOptions = ({ productOptions, quantity, setQuantity }: ProductOptionsProps) => (
  <Select value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value, 10))}>
    {productOptions.map((option, index) => (
      <option key={index} value={option.quantity}>
        {option.quantity}
      </option>
    ))}
  </Select>
);
