import { useQuery } from '@tanstack/react-query';

const fetchProduct = async (productId: string) => {
  const res = await fetch(`http://localhost:3001/products/${productId}`);
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
};

export const useProduct = (productId?: string) => {
  const query = useQuery({
    queryKey: ['product', productId],
    queryFn: async () => fetchProduct(productId!), // ! là để xác định rằng đây là giá trị không thể null
    enabled: !!productId, // Chỉ thực sự chạy khi có productId
  });

  return {
    product: query.data ?? [],
    loading: query.isLoading,
    error: query.isError,
    refetch: query.refetch,
  };
};
