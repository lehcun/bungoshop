import { useQuery } from '@tanstack/react-query';

export const useCart = (isLoggedIn: boolean) => {
  const query = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/me`, {
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to fetch cart ');
      return res.json();
    },
    enabled: isLoggedIn,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return {
    carts: query.data ?? null,
    loading: query.isLoading,
    error: query.isError,
    refetch: query.refetch,
  };
};
