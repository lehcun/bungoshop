import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const loginAccount = async (email: string, password: string) => {
  const res = await fetch('http://localhost:3001/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  });
  return res.json();
};

export const useLogin = () => {
  const router = useRouter();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginAccount(email, password),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      alert('Đăng nhập thành công');
      router.push('/');
    },

    // Khi có lỗi
    onError: (error) => {
      const msg = error.message || 'Đăng nhập thất bại';
      alert(msg);
      console.error('Đăng nhập thất bại lỗi:', error);
    },
  });

  return {
    login: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};
