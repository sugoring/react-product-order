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

const accordionStyles = css`
  .accordion-button {
    padding: 16px;
    background: linear-gradient(135deg, #6a11cb, #2575fc);
    color: white;
    &:hover {
      background: linear-gradient(135deg, #2575fc, #6a11cb);
    }
  }

  .accordion-panel {
    padding: 16px;
    background-color: #f9f9f9;
    border: 1px solid #e2e2e2;
    border-radius: 8px;
  }

  .option-text {
    font-size: 1rem;
    color: #333;
    margin-bottom: 8px;
  }

  .error-text {
    color: #e53e3e;
    font-weight: bold;
  }

  .no-options-text {
    color: #999;
  }
`;

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
