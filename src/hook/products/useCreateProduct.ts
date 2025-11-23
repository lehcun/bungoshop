import { useMutation, useQueryClient } from '@tanstack/react-query';

export interface CreateProductBody {
  name: string;
  slug: string;
  description: string;
  price: number;
  status: string;
  categoryId: string;
  images: {
    url: string;
    alt: string;
  }[];
  variants: {
    sku: string;
    color: string;
    size: string;
    price: number;
    stock: number;
  }[];
}

const createProduct = async (productData: CreateProductBody) => {
  const res = await fetch(`http://localhost:3001/product`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed fetch create new product');
  return res.json();
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      alert('Thêm sản phẩm thành công');
    },

    // Khi có lỗi
    onError: (error) => {
      const msg = error.message || 'Them thất bại';
      alert(msg);
      console.error('Create product error:', error);
    },
  });
  return {
    createProduct: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};
