import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const logout = async () => {
  const res = await fetch('http://localhost:3001/auth/logout', {
    method: 'GET',
    credentials: 'include',
  });
  return res.json();
};

export const useLogout = () => {
  const router = useRouter();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => logout(),

    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['user'] });
      router.push('/buyer/login');
    },
  });

  return {
    logout: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};
