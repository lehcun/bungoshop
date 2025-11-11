import { getUserFavourites } from '@/services/favouriteService';
import { useQuery } from '@tanstack/react-query';

export function useFavourite(token: string | null) {
  const query = useQuery({
    queryKey: ['favourites'],
    queryFn: () => getUserFavourites(token),
    enabled: !!token,
  });

  return {
    favourites: query.data ?? [],
    loading: query.isLoading,
    error: query.isError,
    refetch: query.refetch,
  };
}
