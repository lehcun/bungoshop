import { useQuery } from '@tanstack/react-query';

const fetchAllProduct = async () => {
  const res = await fetch(`http://localhost:3001/products/all`);
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
};

export const useAllProduct = () => {
  const query = useQuery({
    queryKey: ['all_product'],
    queryFn: fetchAllProduct,
  });

  return {
    products: query.data ?? [],
    loading: query.isLoading,
    error: query.isError,
    refetch: query.refetch,
  };
};
