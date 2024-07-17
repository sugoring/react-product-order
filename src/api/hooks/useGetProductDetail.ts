import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { ProductDetailData } from '@/types';

import { fetchInstance } from '../instance';

export const useGetProductDetail = (productId: string) => {
  const queryKey = ['productDetail', productId];

  return useQuery<ProductDetailData, AxiosError>({
    queryKey,
    queryFn: async () => {
      const { data } = await fetchInstance.get<ProductDetailData>(`/v1/products/${productId}/detail`);
      return data;
    },
    enabled: !!productId, 
  });
};
