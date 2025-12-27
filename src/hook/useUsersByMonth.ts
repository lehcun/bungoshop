import { useQuery } from '@tanstack/react-query';

const fetchUsersByMonth = async () => {
  const res = await fetch('http://localhost:3001/users/month');
  if (!res.ok) throw new Error('Failed fetch UserMonthly');
  return res.json();
};

export const useUsersByMonth = () => {
  const query = useQuery({
    queryKey: ['users_month'],
    queryFn: fetchUsersByMonth,
  });

  return {
    usersByMonth: query.data ?? [],
    loading: query.isLoading,
    error: query.isError,
    refetch: query.refetch,
  };
};
