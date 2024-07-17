
import axios from 'axios';
import { useEffect,useState } from 'react';

type ProductOption = {
  maxQuantity: number;
};

const useGetProductOptions = (productId: string) => {
  const [options, setOptions] = useState<ProductOption | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  useEffect(() => {
    axios.get(`/api/v1/products/${productId}/options`)
      .then((response) => {
        setOptions(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [productId]);

  return { options, isLoading, isError };
};

export default useGetProductOptions;
