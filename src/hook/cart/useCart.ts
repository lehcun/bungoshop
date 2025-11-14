import { useQuery } from '@tanstack/react-query';

export const useCart = () => {
  const query = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3001/cart/me', {
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to fetch cart ');
      return res.json();
    },
  });

  return {
    carts: query.data ?? null,
    loading: query.isLoading,
    error: query.isError,
    refetch: query.refetch,
  };
};
