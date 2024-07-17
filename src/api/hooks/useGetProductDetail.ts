import { useQuery } from '@tanstack/react-query';

import type { ProductDetailData } from '@/types';

import { fetchInstance } from '../instance';

export const useGetProductDetail = (productId: string) => {
  return useQuery(['productDetail', productId], async () => {
    const { data } = await fetchInstance.get<ProductDetailData>(`/api/v1/products/${productId}/detail`);
    return data;
  });
};
