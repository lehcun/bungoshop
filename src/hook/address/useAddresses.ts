import { useQuery } from '@tanstack/react-query';

export const useAddresses = () => {
  const query = useQuery({
    queryKey: ['addresses'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3001/users/address', {
        credentials: 'include',
      });
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
