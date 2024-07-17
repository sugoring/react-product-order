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

import type { ProductOption } from '@/types';

interface ProductOptionsProps {
  productOptions: ProductOption[];
  isError: boolean;
}

const ProductOptions: React.FC<ProductOptionsProps> = ({ productOptions, isError }) => (
  <Accordion allowToggle css={accordionStyles}>
    <AccordionItem>
      <AccordionButton className="accordion-button">
        <Box flex="1" textAlign="left" fontSize="lg" fontWeight="bold">
          옵션
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel className="accordion-panel">
        {isError ? (
          <Text className="error-text">옵션 정보를 불러오는 데 실패했습니다.</Text>
        ) : productOptions.length > 0 ? (
          productOptions.map((option) => (
            <Text key={option.id} className="option-text">
              {option.name} (+{option.price.toLocaleString()}원)
            </Text>
          ))
        ) : (
          <Text className="no-options-text">옵션 정보가 없습니다.</Text>
        )}
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
);

export default ProductOptions;

const accordionStyles = css`
  .accordion-button {
    padding: 10px;
    background: #333;
    color: #fff;
    border: none;
    border-bottom: 1px solid #444;
    &:hover {
      background: #444;
    }
  }

  .accordion-panel {
    padding: 15px;
    background: #f9f9f9;
    border-top: 1px solid #ddd;
  }

  .option-text {
    font-size: 1rem;
    color: #333;
    margin-bottom: 10px;
  }

  .error-text {
    color: #e53e3e;
    font-weight: bold;
  }

  .no-options-text {
    color: #999;
  }
`;
