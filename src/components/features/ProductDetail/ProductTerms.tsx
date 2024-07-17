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

const accordionStyles = css`
  .accordion-button {
    padding: 16px;
    background: linear-gradient(135deg, #ff7e5f, #feb47b);
    color: white;
    &:hover {
      background: linear-gradient(135deg, #feb47b, #ff7e5f);
    }
  }

  .accordion-panel {
    padding: 16px;
    background-color: #f9f9f9;
    border: 1px solid #e2e2e2;
    border-radius: 8px;
  }

  .term-box {
    margin-bottom: 12px;
  }

  .term-title {
    font-weight: bold;
    color: #333;
    margin-bottom: 4px;
  }

  .term-description {
    color: #666;
  }
`;

const ProductTerms: React.FC<ProductTermsProps> = ({ productDetail }) => (
  <Accordion allowToggle css={accordionStyles}>
    <AccordionItem>
      <AccordionButton className="accordion-button">
        <Box flex="1" textAlign="left" fontSize="lg" fontWeight="bold">
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
