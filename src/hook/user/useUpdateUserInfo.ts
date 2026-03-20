import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const updateInfoApi = async ({
  name,
  gender,
  dob,
}: {
  name?: string;
  gender: string;
  dob: string;
}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      gender,
      dob,
    }),
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Giam san pham trong giỏ hành thất bại');
  return res.json();
};

export const useUpdateUserInfo = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateInfoApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success(data.message);
    },
  });

  return {
    updateUserInfo: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
  };
};
