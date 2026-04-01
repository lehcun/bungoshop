import { useMutation, useQueryClient } from '@tanstack/react-query';

const deleteAddressApi = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/address/${id}`,
    {
      method: 'DELETE',
      credentials: 'include',
    }
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Lỗi khi xóa địa chỉ');
  }
  return res.json();
};

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteAddressApi(id),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      alert(data.message);
    },
    onError: (error) => {
      console.log('hello');

      alert(error.message);
    },
  });

  return {
    deleteAddress: mutation.mutate,
    isDeleting: mutation.isPending,
  };
};
