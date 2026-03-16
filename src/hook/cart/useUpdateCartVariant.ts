import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export interface UpdateCartVariantPayload {
  cartItemId: string;
  newVariantId: string;
}

const updateCartVariantApi = async (payload: UpdateCartVariantPayload) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/cart/update-variant`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      credentials: 'include',
    }
  );

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Lỗi khi cập nhật phân loại sản phẩm');
  }

  return res.json();
};

// Hook chính
export const useUpdateCartVariant = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateCartVariantApi,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Đã cập nhật phân loại hàng');
    },

    onError: (error: Error) => {
      console.error('Update Variant Error: ', error);
      toast.error(error.message || 'Không thể cập nhật phân loại');
    },
  });

  return {
    updateVariant: mutation.mutate,
    isUpdating: mutation.isPending,
  };
};
