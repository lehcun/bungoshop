import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export interface AddressFormData {
  recipient: string;
  city: string;
  line1: string;
  phone: string;
  label: string;
  isDefault: boolean;
}

const createAddressApi = async (data: AddressFormData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/address`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Không thể tạo địa chỉ');
  return res.json();
};

export const useCreateAddress = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createAddressApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      toast.success('Thêm địa chỉ thành công');
    },
    onError: (error) => {
      toast.error(error.message || 'Lỗi khi thêm địa chỉ');
    },
  });

  return {
    createAddress: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};
