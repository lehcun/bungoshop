import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';

export interface AddressFormData {
  recipient: string;
  city: string;
  line1: string;
  phone: string;
  label: string;
  isDefault: boolean;
}

const fetchAddress = async (data: AddressFormData) => {
  const res = await fetch('http://localhost:3001/users/address', {
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
  const [formData, setFormData] = useState<AddressFormData>({
    recipient: '',
    city: '',
    line1: '',
    phone: '',
    label: '',
    isDefault: false,
  });

  const [isOpenForm, setIsOpenForm] = useState(false);

  const createAddressMutation = useMutation({
    mutationFn: fetchAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      setIsOpenForm(false);
      setFormData({
        recipient: '',
        city: '',
        line1: '',
        phone: '',
        label: '',
        isDefault: true,
      });
      toast.success('Thêm địa chỉ thành công');
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : 'Lỗi khi thêm địa chỉ'
      );
    },
  });

  const toggleForm = useCallback(() => {
    setIsOpenForm((prev) => !prev);
  }, []);

  //Chưa hiểu chính xác tại sao đoạn này lại dùng UseCallBack
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value, // cái này để match với thuộc tính name của mỗi thằng input
      }));
    },
    []
  );

  const handleSubmit = () => {
    console.log('Goi ham handleSumit');
    createAddressMutation.mutate(formData);
  };

  return {
    formData,
    isOpenForm,

    isLoading: createAddressMutation.isPending,

    toggleForm,
    handleChange,
    handleSubmit,
  };
};
