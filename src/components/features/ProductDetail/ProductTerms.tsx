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

interface Term {
  displayCode: string;
  title: string;
  description: string;
}

interface ProductDetail {
  productDetailInfo: {
    terms: Term[];
  };
}

interface ProductTermsProps {
  productDetail: ProductDetail;
}

const ProductTerms: React.FC<ProductTermsProps> = ({ productDetail }) => (
  <Accordion allowToggle css={accordionStyles}>
    <AccordionItem>
      <AccordionButton className="accordion-button">
        <Box flex="1" textAlign="left" fontSize="md" fontWeight="bold">
          약관
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel className="accordion-panel">
        {productDetail.productDetailInfo.terms.map((term) => (
          <Box key={term.displayCode} className="term-box">
            <Text className="term-title">{term.title}</Text>
            <Text className="term-description">{term.description}</Text>
          </Box>
        ))}
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
);

export default ProductTerms;

const accordionStyles = css`
  .accordion-button {
    padding: 10px;
    background: #222;
    color: #fff;
    border: none;
    border-bottom: 1px solid #444;
    &:hover {
      background: #333;
    }
  }

  .accordion-panel {
    padding: 15px;
    background: #f9f9f9;
    border-top: 1px solid #ddd;
  }

  .term-box {
    margin-bottom: 10px;
  }

  .term-title {
    font-weight: bold;
    color: #222;
    margin-bottom: 5px;
  }

  .term-description {
    color: #555;
  }
`;
