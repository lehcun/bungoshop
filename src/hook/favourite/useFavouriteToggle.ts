import { useCurrentUser } from '../auth/useCurrentUser';
import { useFavourite } from './UseFavourite';
import { useCreateFavourite } from './useCreateFavourite';
import { useDeleteFavourite } from './useDeleteFavourite';
import { Favourite } from '@/models/Product';

export const useFavouriteToggle = (productId: string) => {
  const { user } = useCurrentUser();
  const { favourites } = useFavourite(!!user);
  const { createFavourite } = useCreateFavourite();
  const { deleteFavourite } = useDeleteFavourite();

  const isLiked = favourites.find((f: Favourite) => f.productId === productId);

  const toggle = () => {
    if (isLiked) {
      if (confirm(`Bạn chắc chắn muốn xoá sản phẩm này khỏi yêu thích?`)) {
        deleteFavourite(isLiked.id);
      }
    } else {
      createFavourite(productId);
    }
  };

  return {
    isLiked: !!isLiked,
    toggle,
    isLoading: false, // có thể thêm isPending sau
  };
};
