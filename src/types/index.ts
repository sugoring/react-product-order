export type ThemeData = {
  id: number;
  key: string;
  label: string;
  title: string;
  description?: string;
  backgroundColor: string;
  imageURL: string;
};

export type RankingFilterOption = {
  targetType: 'ALL' | 'FEMALE' | 'MALE' | 'TEEN';
  rankType: 'MANY_WISH' | 'MANY_RECEIVE' | 'MANY_WISH_RECEIVE';
};

export type ProductOptionData = {
  productId: number;
  productName: string;
  productPrice: number;
  hasOption: boolean;
  giftOrderLimit: number;
  names: string[];
  options: {
    key: string;
    value: string;
    level: number;
    options: any[]; // 하위 옵션이 없는 경우 any[]로 처리
    id: number;
    usable: boolean;
    price: number;
    stockQuantity: number;
    unlimitedStockQuantity: boolean;
  }[];
};

export interface ProductOption {
  id: number;
  name: string;
  price: number;
}
export type GoodsData = {
  id: number;
  name: string;
  imageURL: string;
  price: {
    basicPrice: number;
    discountRate: number;
    sellingPrice: number;
  };
  brandInfo: {
    id: number;
    name: string;
    imageURL: string;
  };
};

export type ProductDetailData = {
  detail: GoodsData & {
    isAccessableProductPage: boolean;
    review: {
      averageRating: number;
      totalReviewCount: number;
    };
    productDescription: {
      displayImage: string;
    };
    productDetailInfo: {
      announcements: {
        displayOrder: number;
        name: string;
        value: string;
      }[];
      terms: {
        displayCode: string;
        title: string;
        description: string;
      }[];
    };
  };
};
