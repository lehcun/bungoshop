import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const signUp = async (name: string, email: string, password: string) => {
  const res = await fetch('http://localhost:3001/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
    credentials: 'include',
  });
  return res.json();
};

export const useSignUp = () => {
  const router = useRouter();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => signUp(name, email, password),

    onSuccess: (data) => {
      // Nếu backend tự động login (set cookie + trả user), thì:
      queryClient.setQueryData(['user'], data.user || data);
      router.push('/');
    },

    onError: (error) => {
      const msg = error.message || 'Đăng ký thất bại';
      alert(msg);
      console.error('Đăng ký lỗi:', error);
    },
  });

  return {
    signUp: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};
