import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

interface CheckoutPayload {
  paymentMethod: string;
  shippingAddressId: string;
  cartItemIds: string[];
}

export const useCheckout = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      paymentMethod,
      shippingAddressId,
      cartItemIds,
    }: CheckoutPayload) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/checkout`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentMethod,
            shippingAddressId,
            cartItemIds,
          }),
          credentials: 'include',
        }
      );
      return res.json();
    },

    onSuccess: (newOrder) => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['order'] });
      toast.success(`Tạo thành công đơn hàng ${newOrder.order.id}`);
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
