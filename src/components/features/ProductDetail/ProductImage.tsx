import { Image } from '@chakra-ui/react';
import { css } from '@emotion/react';

interface ProductImageProps {
  imageURL: string;
  name: string;
}

const imageStyles = css`
  img {
    max-width: 100%;
    height: auto;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition:
      transform 0.3s,
      box-shadow 0.3s;

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }
  }
`;

const ProductImage: React.FC<ProductImageProps> = ({ imageURL, name }) => (
  <Image src={imageURL} alt={name} css={imageStyles} />
);

export default ProductImage;
