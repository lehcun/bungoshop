import { useQuery } from '@tanstack/react-query';

export const getUserOrder = async () => {
  const res = await fetch('http://localhost:3001/orders/user/history', {
    headers: {
      cache: 'no-store',
    },
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to fetch user history');

  return res.json();
};

export function useOrderByUser() {
  const query = useQuery({
    queryKey: ['orders', 'user'], // sửa lại key này để caching tốt hơn
    queryFn: () => getUserOrder(),
  });
  return {
    orders: query.data || [],
    loading: query.isLoading,
    error: query.isError,
    refetch: query.refetch,
  };
}
