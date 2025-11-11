import { useAuth } from '@/contexts/AuthContext';
import { useFavourite } from './UseFavourite';
import { useCreateFavourite } from './useCreateFavourite';
import { useDeleteFavourite } from './useDeleteFavourite';
import { Favourite } from '@/models/Product';
import toast from 'react-hot-toast';

export const useFavouriteToggle = (productId: string) => {
  const { user, token } = useAuth();
  const { favourites } = useFavourite(token);
  const { mutate } = useCreateFavourite();
  const { deleteFavourite } = useDeleteFavourite();

  const isLiked = favourites.find((f: Favourite) => f.productId === productId);

  const toggle = () => {
    if (!user) {
      toast.error('Phải đăng nhập trước');
      return;
    }
    if (isLiked) {
      if (confirm(`Bạn chắc chắn muốn xoá sản phẩm này khỏi yêu thích?`)) {
        deleteFavourite(isLiked.id);
      }
    } else {
      mutate({ userId: user.id, productId });
    }
  };

  return {
    isLiked: !!isLiked,
    toggle,
    isLoading: false, // có thể thêm isPending sau
  };
};
