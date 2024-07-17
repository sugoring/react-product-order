import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { ProductDetailData } from '@/types';

import { fetchInstance } from '../instance';

const getProductDetailPath = (productId: string) => `/v1/products/${productId}/detail`;

export const getProductDetail = async (productId: string) => {
  const response = await fetchInstance.get<ProductDetailData>(getProductDetailPath(productId));
  return response.data; // 필요에 따라 데이터 변환 로직 추가
};

export const useGetProductDetail = (productId: string) => {
  return useQuery<ProductDetailData, AxiosError>({
    queryKey: ['productDetail', productId],
    queryFn: () => getProductDetail(productId),
    // 오류 처리 로직 추가 (필요에 따라)
    // enabled: !!productId, // productId가 있을 때만 쿼리 실행
  });
};
