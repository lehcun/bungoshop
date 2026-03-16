import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const fetchReOrder = async (orderId: string) => {
  const res = await fetch(`http://localhost:3001/orders/reOrder`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      orderId,
    }),
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to reOrder ');
  return res.json();
};

export const useReOrder = (orderId: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => fetchReOrder(orderId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      router.push('/cart');
    },

    // Khi có lỗi
    onError: (error) => {
      alert('Mua lại thất bại');
      console.error(error.message);
    },
  });

  return {
    reOrder: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};
