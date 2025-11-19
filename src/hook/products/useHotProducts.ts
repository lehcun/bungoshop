import { useQuery } from '@tanstack/react-query';

const fetchProduct = async (count: number) => {
  const res = await fetch(`http://localhost:3001/products/hot/${count}`);
  if (!res.ok) throw new Error('Failed to fetch hot products');
  return res.json();
};

export const useHotProduct = (count?: number) => {
  const query = useQuery({
    queryKey: ['hot_product'],
    queryFn: async () => fetchProduct(count!), // ! là để xác định rằng đây là giá trị không thể null
    enabled: !!count, // Chỉ thực sự chạy khi có count
  });

  return {
    products: query.data ?? [],
    loading: query.isLoading,
    error: query.isError,
    refetch: query.refetch,
  };
};
