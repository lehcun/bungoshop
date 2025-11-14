import { useMutation, useQueryClient } from '@tanstack/react-query';

const decreaseQuantity = async (
  cartItemId: string,
  decrementAmount: number
) => {
  const res = await fetch(`http://localhost:3001/cart/${cartItemId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: cartItemId,
      quantityChange: decrementAmount,
    }),
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Giam san pham trong giỏ hành thất bại');
  return res.json();
};

export const useDecreaseQuantity = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({
      cartItemId,
      decrementAmount,
    }: {
      cartItemId: string;
      decrementAmount: number;
    }) => decreaseQuantity(cartItemId, decrementAmount),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  return {
    decreaseQty: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};
