import { useQuery } from '@tanstack/react-query';

const fetchOrderGrowth = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/month`);
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
};

export const useOrderGrowth = () => {
  const query = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrderGrowth,
  });

  return {
    orderMonthlyResult: query.data,
    loading: query.isLoading,
    error: query.isError,
    refetch: query.refetch,
  };
};
