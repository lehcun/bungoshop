import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export interface ReviewPayload {
  productId: string;
  variantId: string;
  rating: number;
  comment: string;
}

const submitReviewApi = async ({
  payload,
  orderId,
}: {
  payload: ReviewPayload[];
  orderId: string;
}) => {
  const res = await fetch(`http://localhost:3001/reviews?id=${orderId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    credentials: 'include',
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Có lỗi xảy ra khi gửi đánh giá');
  }

  return res.json();
};

export const useSubmitReview = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: submitReviewApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success(`Gửi đánh giá thành công ${data.insertedCount} sản phẩm`);
    },

    onError: (error) => {
      alert('Gửi đánh giá thất bại');
      console.error(error.message);
    },
  });

  return {
    submitReviews: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};
