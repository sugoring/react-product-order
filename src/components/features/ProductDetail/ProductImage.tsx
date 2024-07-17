import { Image } from '@chakra-ui/react';

interface ProductImageProps {
  imageURL: string;
  name: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ imageURL, name }) => (
  <Image src={imageURL} alt={name} />
);

export default ProductImage;
