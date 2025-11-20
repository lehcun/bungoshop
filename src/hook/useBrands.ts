import { useQuery } from '@tanstack/react-query';

const fetchBrands = async () => {
  const res = await fetch('http://localhost:3001/brands');
  if (!res.ok) throw new Error('Failed fetch brands');
  return res.json();
};

export const useBrands = () => {
  const query = useQuery({
    queryKey: ['brands'],
    queryFn: fetchBrands,
    staleTime: 60 * 60 * 1000, // 1h không refetch
  });

  return {
    brands: query.data,
    loading: query.isLoading,
    error: query.isError,
    refetch: query.refetch,
  };
};
