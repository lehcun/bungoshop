import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const loginAccount = async (email: string, password: string) => {
  const res = await fetch('http://localhost:3001/auth/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  });
  return res.json();
};

export const useAdminLogin = () => {
  const router = useRouter();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginAccount(email, password),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      alert('Đăng nhập thành công');
      router.push('/dashboard');
    },

    // Khi có lỗi
    onError: (error) => {
      const msg = error.message || 'Admin đăng nhập thất bại';
      alert(msg);
      console.error('Admin đăng nhập thất bại lỗi:', error);
    },
  });

  return {
    adminLogin: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};
