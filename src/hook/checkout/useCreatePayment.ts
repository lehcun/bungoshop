import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export interface CreatePaymentBody {
  amount: number;
  info: string;
}

const createPayment = async (paymentData: CreatePaymentBody) => {
  const res = await fetch(`http://localhost:3001/payment/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(paymentData),
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed fetch create new product');
  return res.json();
};

export const useCreatePayment = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createPayment,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Thanh toan thanh cong');
      router.push(data.url);
    },

    onError: (error) => {
      console.log('err mess: ', error);
      alert(error);
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
