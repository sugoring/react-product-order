import axios from 'axios';
import { useEffect,useState } from 'react';

type ProductDetail = {
  imageURL: string;
  brand: string;
  name: string;
  price: number;
};

const useGetProductDetail = (productId: string) => {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  useEffect(() => {
    axios.get(`/api/v1/products/${productId}/detail`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [productId]);

  return { product, isLoading, isError };
};

export default useGetProductDetail;
