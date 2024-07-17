import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { ProductOption, ProductOptionData } from '@/types';

import { fetchInstance } from '../instance';

export const useGetProductOptions = (productId: string) => {
  return useQuery<ProductOption[], AxiosError>({
    queryKey: ['productOptions', productId],
    queryFn: async () => {
      const { data } = await fetchInstance.get<ProductOptionData>(`/v1/products/${productId}/options`);
      // 옵션 데이터 변환 (ProductOptionData -> ProductOption[])
      return data.options.map(option => ({
        id: option.id,
        name: option.value, // value를 name으로 사용
        price: option.price
      }));
    }
  });
};
