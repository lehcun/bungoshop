import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export type CreateProductData = {
  userId: string;
  productId: string;
};

export const useCreateFavourite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateProductData) => {
      const { userId, productId } = data;
      const res = await fetch('http://localhost:3001/favourite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          productId,
        }),
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
};
