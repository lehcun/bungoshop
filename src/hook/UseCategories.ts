import { useQuery } from '@tanstack/react-query';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3001/categories');
      if (!res.ok) throw new Error('Failed to fetch user history');
      return res.json();
    },
    staleTime: 5 * 60 * 1000, // 5 phút không refetch
  });
};
