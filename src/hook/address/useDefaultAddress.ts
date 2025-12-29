import { useQuery } from '@tanstack/react-query';

export const useDefaultAddress = () => {
  const query = useQuery({
    queryKey: ['addresses', 'default'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3001/users/address/default', {
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to fetch user address');
      return res.json();
    },
  });

  return {
    defaultAddress: query.data,
    loading: query.isLoading,
    error: query.isError,
    refetch: query.refetch,
  };
};
