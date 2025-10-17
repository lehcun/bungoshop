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
  filters: {
    categories: string[];
    brands: string[];
    sort: 'priceAsc' | 'priceDesc' | 'newest' | 'oldest' | 'default';
  };
  setFilters: (filters: {
    categories: string[];
    brands: string[];
    priceRange: string;
    sort: 'priceAsc' | 'priceDesc' | 'newest' | 'oldest' | 'default';
  }) => void;
  setCategories: (categories: string[]) => void;
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
  const categoryParam = searchParams.get('categories')?.toString();
  const brandParam = searchParams.get('brands')?.toString();
  const sortParam = searchParams.get('sort');

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [filters, setFilters] = useState<{
    categories: string[];
    brands: string[];
    priceRange: string;
    sort: 'priceAsc' | 'priceDesc' | 'newest' | 'oldest' | 'default';
  }>({
    categories: categoryParam ? categoryParam.split(',') : [],
    brands: brandParam ? brandParam.split(',') : [],
    priceRange: '',
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

        const url = displayCount
          ? `http://localhost:3001/products/display/${displayCount}`
          : `http://localhost:3001/products?${params}`;

        const res = await fetch(url);
        const data = await res.json();
        setProducts(data);

        if (!displayCount) {
          router.push(`/shop?${params.toString()}`, { scroll: false });
        }
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    },
    [filters, router]
  );

  useEffect(() => {
    fetchProducts(displayCount);
  }, [fetchProducts, displayCount]);

  const setCategories = (categories: string[]) => {
    setFilters((prev) => ({ ...prev, categories }));
  };

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
        setCategories,
        setSort,
        refetch,
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
