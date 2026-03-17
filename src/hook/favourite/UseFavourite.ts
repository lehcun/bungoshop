import { useQuery } from '@tanstack/react-query';

export const getUserFavourites = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourite`, {
    headers: {
      cache: 'no-store',
    },
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to fetch user history');

  return res.json();
};

export function useFavourite(isLoggedIn: boolean) {
  const query = useQuery({
    queryKey: ['favourites'],
    queryFn: getUserFavourites,
    enabled: isLoggedIn,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return {
    favourites: query.data ?? [],
    loading: query.isLoading,
    error: query.isError,
    refetch: query.refetch,
  };
}
