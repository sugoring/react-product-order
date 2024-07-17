import { useQuery } from '@tanstack/react-query';

import type { GoodsData } from '@/types';

import { fetchInstance } from '../instance';

export const useGetProductDetail = (productId: string) => {
  return useQuery({
    queryKey: ['productDetail', productId],
    queryFn: async () => {
      const { data } = await fetchInstance.get<GoodsData>(`/v1/products/${productId}/detail`);
      return data;
    },
  });
};
