import { useQuery } from '@tanstack/react-query';

export const useCurrentUser = () => {
  const query = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3001/users/me', {
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to fetch Current user ');
      return res.json();
    },
  });

  return {
    user: query.data ?? null,
    loading: query.isLoading,
    error: query.isError,
    refetch: query.refetch,
  };
};
