'use client';

import { Product } from '@/models/Product';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  useContext,
  createContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from 'react';

interface ProductListContextType {
  products: Product[];
  loading: boolean;
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
  filters: {
    categories: string[];
    brands: string[];
    sort: 'priceAsc' | 'priceDesc' | 'newest' | 'oldest' | 'default';
    priceRange: string;
  };
  setFilters: (filters: {
    categories: string[];
    brands: string[];
    sort: 'priceAsc' | 'priceDesc' | 'newest' | 'oldest' | 'default';
    priceRange: string;
  }) => void;
  setSort: (
    sort: 'priceAsc' | 'priceDesc' | 'newest' | 'oldest' | 'default'
  ) => void;
  refetch: () => void;
}

const ProductListContext = createContext<ProductListContextType | null>(null);

export const ProductListProvider = ({
  children,
  displayCount,
}: {
  children: ReactNode;
  displayCount?: number;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageParam = Number(searchParams.get('page')) || 1;
  const categoryParam = searchParams.get('categories')?.toString();
  const brandParam = searchParams.get('brands')?.toString();
  const sortParam = searchParams.get('sort');
  const priceRangeParam = searchParams.get('priceRange');

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(pageParam);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [filters, setFilters] = useState<{
    categories: string[];
    brands: string[];
    sort: 'priceAsc' | 'priceDesc' | 'newest' | 'oldest' | 'default';
    priceRange: string;
  }>({
    categories: categoryParam ? categoryParam.split(',') : [],
    brands: brandParam ? brandParam.split(',') : [],
    priceRange: priceRangeParam || '',
    sort:
      sortParam === 'priceAsc' ||
      sortParam === 'priceDesc' ||
      sortParam === 'newest' ||
      sortParam === 'oldest' ||
      sortParam === 'default'
        ? sortParam
        : 'default',
  });

  const fetchProducts = useCallback(
    async (displayCount?: number) => {
      try {
        setLoading(true);

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

        const url = displayCount
          ? `http://localhost:3001/products/display/${displayCount}`
          : `http://localhost:3001/products?${params}`;

        const res = await fetch(url);
        const data = await res.json();

        // Giả sử backend trả { data, meta }
        setProducts(data.data || data);

        if (data.meta?.totalPages) setTotalPages(data.meta.totalPages);

        //Cap nhat url
        if (!displayCount) {
          router.push(`/shop?${params.toString()}`, { scroll: false });
        }
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        //test loading
        // await new Promise((resolve) => setTimeout(resolve, 5000));
        setLoading(false);
      }
    },
    [filters, router, page]
  );

  useEffect(() => {
    fetchProducts(displayCount);
  }, [fetchProducts, displayCount]);

  const setSort = (
    sort: 'priceAsc' | 'priceDesc' | 'newest' | 'oldest' | 'default'
  ) => {
    setFilters((prev) => ({ ...prev, sort }));
  };

  const refetch = async () => fetchProducts();

  return (
    <ProductListContext.Provider
      value={{
        products,
        loading,
        filters,
        setFilters,
        setSort,
        refetch,
        page,
        setPage,
        totalPages,
      }}
    >
      {children}
    </ProductListContext.Provider>
  );
};

export const useProductListContext = () => {
  const context = useContext(ProductListContext);
  if (!context)
    throw new Error(
      'useProductListContext must be used inside ProductListProvider'
    );
  return context;
};
