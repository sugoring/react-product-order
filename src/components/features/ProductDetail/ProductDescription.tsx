import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from '@chakra-ui/react';
import { css } from '@emotion/react';

interface Announcement {
  displayOrder: number;
  name: string;
  value: string;
}

interface ProductDetail {
  productDetailInfo: {
    announcements: Announcement[];
  };
  productDescription: {
    displayImage: string;
  };
}

interface ProductDescriptionProps {
  productDetail: ProductDetail;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ productDetail }) => (
  <Accordion allowToggle css={accordionStyles}>
    <AccordionItem>
      <AccordionButton className="accordion-button">
        <Box className="box-title">상품 상세 정보</Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel className="accordion-panel">
        {productDetail.productDetailInfo.announcements.map((announcement) => (
          <Box key={announcement.displayOrder} className="announcement-box">
            <Text className="announcement-title">{announcement.name}:</Text>
            <Text className="announcement-value">{announcement.value}</Text>
          </Box>
        ))}
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem>
      <AccordionButton className="accordion-button">
        <Box className="box-title">상품 설명</Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel className="accordion-panel product-description">
        <div dangerouslySetInnerHTML={{ __html: productDetail.productDescription.displayImage }} />
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
);

export default ProductDescription;

const accordionStyles = css`
  .accordion-button {
    padding: 10px;
    background: #333;
    color: #fff;
    border: none;
    &:hover {
      background: #444;
    }
  }

  .accordion-panel {
    padding: 15px;
    background-color: #f9f9f9;
    border-top: 1px solid #ddd;
    margin-top: 4px;
  }

  .box-title {
    flex: 1;
    text-align: left;
    font-size: 1.2rem;
    font-weight: bold;
    color: #000;
  }

  .announcement-box {
    margin-bottom: 10px;
  }

  .announcement-title {
    font-weight: bold;
    color: #333;
  }

  .announcement-value {
    color: #666;
  }

  .product-description {
    div {
      img {
        max-width: 100%;
        height: auto;
        border-radius: 0;
        filter: grayscale(100%);
      }
    }
  }
`;
