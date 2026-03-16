import { useQuery } from '@tanstack/react-query';

const fetchProductVariants = async (productId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}/variants`
  );

  if (!res.ok) throw new Error('Không thể tải danh sách phân loại');

  return res.json();
};

export const useProductVariants = (productId: string, isOpen: boolean) => {
  const query = useQuery({
    queryKey: ['product-variants', productId],
    queryFn: () => fetchProductVariants(productId),
    //enabled = isOpen giúp API CHỈ CHẠY khi popup mở
    enabled: isOpen,
    staleTime: 5 * 60 * 1000,
  });

  return {
    productVariants: query.data,
    loading: query.isLoading,
    error: query.isError,
    refetch: query.refetch,
  };
};
