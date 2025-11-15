import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useCreateFavourite = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (productId: string) => {
      const res = await fetch('http://localhost:3001/favourite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
        }),
        credentials: 'include',
      });
      return res.json();
    },

    onSuccess: (newFavourite) => {
      queryClient.invalidateQueries({ queryKey: ['favourites'] });
      toast.success(`Đã thêm ${newFavourite.product.name} vào yêu thích"!`);
    },

    onError: (error) => {
      const msg = error.message || 'Thêm sản phẩm thất bại';
      toast.error(msg);
    },
  });

  return {
    createFavourite: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};
