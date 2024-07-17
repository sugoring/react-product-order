import { useQuery } from '@tanstack/react-query';

import type { ProductOption } from '@/types';

import { fetchInstance } from '../instance';

export const useGetProductOptions = (productId: string) => {
  return useQuery({
    queryKey: ['productOptions', productId],
    queryFn: async () => {
      const { data } = await fetchInstance.get<ProductOption[]>(`/v1/products/${productId}/options`);
      return data;
    },
  });
};
