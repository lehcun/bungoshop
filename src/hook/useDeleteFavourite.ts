import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

// Hàm gọi API DELETE (có thể tách riêng nếu thích)
const deleteFavourite = async (favouriteId: string) => {
  const res = await fetch(`http://localhost:3001/favourite/${favouriteId}`, {
    method: 'DELETE',
  });
  return res.json(); // thường server trả về { success: true } hoặc product đã xoá
};

export const useDeleteFavourite = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteFavourite,

    onSuccess: (favourite) => {
      queryClient.invalidateQueries({ queryKey: ['favourites'] });
      toast.success(`Đã xóa ${favourite.product.name} thành công"!`);
    },

    // Khi có lỗi
    onError: (error) => {
      const msg = error.message || 'Xoá thất bại';
      alert(msg);
      console.error('Delete product error:', error);
    },
  });

  return {
    deleteFavourite: (id: string) => mutation.mutate(id),
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    reset: mutation.reset, // dùng để clear trạng thái sau khi toast
  };
};
