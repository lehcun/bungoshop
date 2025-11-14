import { getUserFavourites } from '@/services/favouriteService';
import { useQuery } from '@tanstack/react-query';

export function useFavourite() {
  const query = useQuery({
    queryKey: ['favourites'],
    queryFn: () => getUserFavourites(),
  });

  return {
    favourites: query.data ?? [],
    loading: query.isLoading,
    error: query.isError,
    refetch: query.refetch,
  };
}
