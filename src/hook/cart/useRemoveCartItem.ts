import { useMutation, useQueryClient } from '@tanstack/react-query';

const removeCartItem = async (cartItemId: string) => {
  const res = await fetch(`http://localhost:3001/cart/${cartItemId}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!res.ok) throw new Error('Xoa san pham trong gio hang that bai');
  return res.json();
};

export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (cartItemId: string) => removeCartItem(cartItemId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  return {
    removeCart: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};
