import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AddressFormData } from './useCreateAddress';

const updateAddressApi = async ({
  id,
  ...data
}: { id: string } & Partial<AddressFormData & { isDefault: boolean }>) => {
  const res = await fetch(`http://localhost:3001/users/address/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Không thể cập nhật địa chỉ');
  return res.json();
};

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateAddressApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      toast.success('Cập nhật địa chỉ thành công');
    },
    onError: (error) => {
      toast.error(error.message || 'Lỗi khi thêm địa chỉ');
    },
  });

  return {
    updateAddress: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};
