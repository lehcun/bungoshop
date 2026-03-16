import { useQuery } from '@tanstack/react-query';

export const useAddresses = () => {
  const query = useQuery({
    queryKey: ['addresses', 'all'],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/address`,
        {
          credentials: 'include',
        }
      );
      if (!res.ok) throw new Error('Failed to fetch user address');
      return res.json();
    },
  });

  return {
    addresses: query.data ?? [],
    loading: query.isLoading,
    error: query.isError,
    refetch: query.refetch,
  };
};
