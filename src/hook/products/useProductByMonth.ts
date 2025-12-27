import { useQuery } from '@tanstack/react-query';

const fetchProductByMonth = async () => {
  const res = await fetch(`http://localhost:3001/products/month`);
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
};

export const useProductByMonth = () => {
  const query = useQuery({
    queryKey: ['product_month'],
    queryFn: fetchProductByMonth,
  });

  return {
    productsByMonth: query.data ?? [],
    loading: query.isLoading,
    error: query.isError,
    refetch: query.refetch,
  };
};
