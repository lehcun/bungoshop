import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export interface CreatePaymentBody {
  amount: number;
  info: string;
  orderId: string;
}

const createPayment = async (paymentData: CreatePaymentBody) => {
  const res = await fetch(`http://localhost:3001/payment/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(paymentData),
    credentials: 'include',
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Lỗi khi tạo phiên thanh toán');
  }
  return res.json();
};

export const useCreatePayment = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createPayment,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.loading('Chuyển hướng sang tranh thanh toán');
      router.push(data.url);
    },

    onError: (error) => {
      console.error('Payment Error: ', error);
      toast.error(error.message || 'Đã có lỗi xảy ra khi thanh toán');
    },
  });

  return {
    createPayment: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};
