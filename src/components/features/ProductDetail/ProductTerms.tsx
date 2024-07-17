import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from '@chakra-ui/react';

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
  <Accordion allowToggle>
    <AccordionItem>
      <AccordionButton>
        <Box flex="1" textAlign="left" fontSize="lg" fontWeight="bold">
          약관
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4}>
        {productDetail.productDetailInfo.terms.map((term) => (
          <Box key={term.displayCode}>
            <Text fontWeight="bold">{term.title}</Text>
            <Text>{term.description}</Text>
          </Box>
        ))}
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
);

export default ProductTerms;
