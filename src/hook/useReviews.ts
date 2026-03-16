import { useQuery } from '@tanstack/react-query';

const fetchReviews = async (productId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/reviews/${productId}`
  );
  if (!res.ok) throw new Error('Failed to fetch reviews');
  return res.json();
};

export const useReviews = (productId?: string) => {
  const query = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => fetchReviews(productId!), // ! là để xác định rằng đây là giá trị không thể null
    enabled: !!productId, // Chỉ thực sự chạy khi có productId
  });

  return {
    reviews: query.data ?? [],
    loading: query.isLoading,
    error: query.isError,
    refetch: query.refetch,
  };
};
