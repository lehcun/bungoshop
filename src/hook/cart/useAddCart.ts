import { useMutation, useQueryClient } from '@tanstack/react-query';

const addCart = async (
  productId: string,
  variantId: string,
  quantity: number
) => {
  const res = await fetch('http://localhost:3001/cart/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      productId,
      variantId,
      quantity,
    }),
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to fetch add cart ');
  return res.json();
};

export const useAddCart = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({
      productId,
      variantId,
      quantity,
    }: {
      productId: string;
      variantId: string;
      quantity: number;
    }) => addCart(productId, variantId, quantity),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },

    // Khi có lỗi
    onError: (error) => {
      const msg = error.message || 'Thêm sản phẩm vào giỏ thất bại';
      alert(msg);
      console.error('Lỗi thêm giỏ hàng:', error);
    },
  });

  return {
    addCart: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};
