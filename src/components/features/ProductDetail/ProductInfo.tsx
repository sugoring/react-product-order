import React from 'react';

type ProductInfoProps = {
  imageURL: string;
  brand: string;
  name: string;
  price: number;
};

const ProductInfo: React.FC<ProductInfoProps> = ({ imageURL, brand, name, price }) => {
  return (
    <div>
      <img src={imageURL} alt={name} />
      <h1>{name}</h1>
      <h2>{brand}</h2>
      <p>{price.toLocaleString()}원</p>
    </div>
  );
};

export default ProductInfo;
