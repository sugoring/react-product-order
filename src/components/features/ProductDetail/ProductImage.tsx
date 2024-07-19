import { Image } from '@chakra-ui/react';
import { css } from '@emotion/react';

interface ProductImageProps {
  imageURL: string;
  name: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ imageURL, name }) => (
  <Image src={imageURL} alt={name} css={imageStyles} />
);

export default ProductImage;

const imageStyles = css`
  max-width: 100%;
  height: auto;
  border-radius: 0;
  box-shadow: none;
  transition:
    transform 0.3s,
    filter 0.3s;

  &:hover {
    transform: scale(1.05);
    filter: grayscale(100%);
  }
`;
