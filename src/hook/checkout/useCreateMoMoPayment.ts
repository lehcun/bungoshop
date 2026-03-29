import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export interface CreateMoMoPaymentBody {
  orderId: string;
}

const createMoMoPayment = async (paymentData: CreateMoMoPaymentBody) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/payment/momo/create`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paymentData),
      credentials: 'include',
    }
  );
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Lỗi khi tạo phiên thanh toán MoMo');
  }
  return res.json();
};

export const useCreateMoMoPayment = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createMoMoPayment,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.loading('Chuyển hướng sang cổng MoMo...');

      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error('Không tìm thấy đường dẫn thanh toán MoMo!');
      }
    },

    onError: (error) => {
      console.error('MoMo Payment Error: ', error);
      toast.error(error.message || 'Đã có lỗi xảy ra khi thanh toán MoMo');
    },
  });

  return {
    createMoMoPayment: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};
