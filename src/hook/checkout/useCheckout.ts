import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

interface CheckoutPayload {
  paymentMethod: string;
  shippingAddressId: string;
}

export const useCheckout = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      paymentMethod,
      shippingAddressId,
    }: CheckoutPayload) => {
      const res = await fetch('http://localhost:3001/orders/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethod,
          shippingAddressId,
        }),
        credentials: 'include',
      });
      return res.json();
    },

    onSuccess: (newOrder) => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['order'] });
      toast.success(`Thanh toán thành công đơn hàng ${newOrder.order.id}`);
    },

    onError: (error) => {
      const msg = error.message || 'Thêm sản phẩm thất bại';
      toast.error(msg);
    },
  });

  return {
    createOrder: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};
