import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { ProductOption, ProductOptionData } from '@/types';

import { fetchInstance } from '../instance';

const getProductOptionsPath = (productId: string) => `/v1/products/${productId}/options`;

export const getProductOptions = async (productId: string): Promise<ProductOption[]> => {
  const { data } = await fetchInstance.get<ProductOptionData>(getProductOptionsPath(productId));
  return data.options.map((option) => ({
    id: option.id,
    name: option.value,
    price: option.price,
  }));
};

export const useGetProductOptions = (productId: string) => {
  return useQuery<ProductOption[], AxiosError>({
    queryKey: ['productOptions', productId],
    queryFn: () => getProductOptions(productId),
    // 오류 처리 로직 추가 (필요에 따라)
    // enabled: !!productId, // productId가 있을 때만 쿼리 실행
  });
};
