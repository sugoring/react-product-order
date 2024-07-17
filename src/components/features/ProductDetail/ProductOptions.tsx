import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from '@chakra-ui/react';

import type { ProductOption } from '@/types';

interface ProductOptionsProps {
  productOptions: ProductOption[];
  isError: boolean;
}

const ProductOptions: React.FC<ProductOptionsProps> = ({ productOptions, isError }) => (
  <Accordion allowToggle>
    <AccordionItem>
      <AccordionButton>
        <Box flex="1" textAlign="left" fontSize="lg" fontWeight="bold">
          옵션
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4}>
        {isError ? (
          <Text>옵션 정보를 불러오는 데 실패했습니다.</Text>
        ) : productOptions.length > 0 ? (
          productOptions.map((option) => (
            <Text key={option.id}>
              {option.name} (+{option.price.toLocaleString()}원)
            </Text>
          ))
        ) : (
          <Text>옵션 정보가 없습니다.</Text>
        )}
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
);

export default ProductOptions;
