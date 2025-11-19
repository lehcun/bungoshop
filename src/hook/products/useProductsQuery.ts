import { useQuery } from '@tanstack/react-query';

interface fetchParam {
  filters: {
    categories: string[];
    brands: string[];
    sort: string;
    priceRange: string;
  };
  page: number;
}

const fetchProductsFn = async ({ filters, page }: fetchParam) => {
  const params = new URLSearchParams();

  if (filters.categories?.length) {
    params.append('categories', filters.categories.join(','));
  }

  if (filters.brands?.length) {
    params.append('brands', filters.brands.join(','));
  }

  if (filters.sort) params.append('sort', filters.sort);

  if (filters.priceRange) params.append('priceRange', filters.priceRange);

  params.append('page', page.toString());
  params.append('limit', '12');

  const res = await fetch(
    `http://localhost:3001/products?${params.toString()}`
  );
  if (!res.ok) throw new Error('Loi fetch bang param');
  return res.json();
};

export const useProductQuery = (
  filters: fetchParam['filters'],
  page: number
) => {
  const query = useQuery({
    queryKey: ['products', filters, page],
    queryFn: async () => fetchProductsFn({ filters, page }),
    staleTime: 0,
  });

  return {
    products: query.data?.data ?? [],
    meta: query.data?.meta ?? {},
    loading: query.isLoading,
    error: query.isError,
    refetch: query.refetch,
  };
};
