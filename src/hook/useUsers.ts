import { useQuery } from '@tanstack/react-query';

const fetchUsers = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`);
  if (!res.ok) throw new Error('Failed fetch All User');
  return res.json();
};

export const useUsers = () => {
  const query = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  return {
    users: query.data ?? [],
    loading: query.isLoading,
    error: query.isError,
    refetch: query.refetch,
  };
};
