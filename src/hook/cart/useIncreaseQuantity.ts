import { useMutation, useQueryClient } from '@tanstack/react-query';

const increaseQuantity = async (
  cartItemId: string,
  incrementAmount: number
) => {
  const res = await fetch(`http://localhost:3001/cart/${cartItemId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: cartItemId,
      quantityChange: incrementAmount,
    }),
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Tang san pham trong giỏ hành thất bại');
  return res.json();
};

export const useIncreaseQuantity = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({
      cartItemId,
      incrementAmount,
    }: {
      cartItemId: string;
      incrementAmount: number;
    }) => increaseQuantity(cartItemId, incrementAmount),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  return {
    increaseQty: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};
