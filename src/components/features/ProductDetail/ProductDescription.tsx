import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from '@chakra-ui/react';

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
  <Accordion allowToggle>
    <AccordionItem>
      <AccordionButton>
        <Box flex="1" textAlign="left" fontSize="lg" fontWeight="bold">
          상품 상세 정보
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4}>
        {productDetail.productDetailInfo.announcements.map((announcement) => (
          <Box key={announcement.displayOrder}>
            <Text fontWeight="bold">{announcement.name}:</Text>
            <Text>{announcement.value}</Text>
          </Box>
        ))}
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem>
      <AccordionButton>
        <Box flex="1" textAlign="left" fontSize="lg" fontWeight="bold">
          상품 설명
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4}>
        <div dangerouslySetInnerHTML={{ __html: productDetail.productDescription.displayImage }} />
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
);

export default ProductDescription;
