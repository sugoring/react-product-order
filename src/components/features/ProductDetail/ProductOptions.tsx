import React, { useState } from 'react';

type ProductOptionsProps = {
  maxQuantity: number;
};

const ProductOptions: React.FC<ProductOptionsProps> = ({ maxQuantity }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div>
      <label htmlFor="quantity">수량</label>
      <input
        id="quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        min={1}
        max={maxQuantity}
      />
    </div>
  );
};

export default ProductOptions;
