import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { ProductDetailData } from '@/types';

import { fetchInstance } from '../instance';

export const useGetProductDetail = (productId: string) => {
  return useQuery<ProductDetailData, AxiosError>({
    queryKey: ['productDetail', productId],
    queryFn: async () => {
      const { data } = await fetchInstance.get<ProductDetailData>(`/v1/products/${productId}/detail`);

      return data;
    },
    onError: (error: AxiosError) => {
      console.error('상품 상세 정보를 불러오는 중 오류가 발생했습니다:', error.message);
    },
  });
};
