import { getUserFavourites } from '@/services/favouriteService';
import { useQuery } from '@tanstack/react-query';

export function useFavourite(token: string | null) {
  return useQuery({
    queryKey: ['favourite'],
    queryFn: () => getUserFavourites(token),
    enabled: !!token,
  });
}
