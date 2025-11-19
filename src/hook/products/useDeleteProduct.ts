import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const deleteProduct = async (productId: string) => {
  const res = await fetch(`http://localhost:3001/product/${productId}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  return res.json();
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product'] });
      toast.success(`Đã xóa san pham thành công"!`);
    },

    // Khi có lỗi
    onError: (error) => {
      const msg = error.message || 'Xoá thất bại';
      alert(msg);
      console.error('Delete product error:', error);
    },
  });

  return {
    deleteProduct: (id: string) => mutation.mutate(id),
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    reset: mutation.reset, // dùng để clear trạng thái sau khi toast
  };
};
