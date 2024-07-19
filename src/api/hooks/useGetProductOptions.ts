import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { ProductOption, ProductOptionData } from '@/types';

import { fetchInstance } from '../instance';

export const useGetProductOptions = (productId: string) => {
  const queryKey = ['productOptions', productId];

  return useQuery<ProductOption[], AxiosError>({
    queryKey,
    queryFn: async () => {
      const { data } = await fetchInstance.get<ProductOptionData>(`/v1/products/${productId}/options`);
      return data.options.map((option) => ({
        id: option.id,
        name: option.value,
        price: option.price,
      }));
    },
    enabled: !!productId, // productId가 있을 때만 쿼리 활성화
  });
};
