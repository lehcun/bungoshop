'use client';

import { Product } from '@/models/Product';
import { useRouter } from 'next/navigation';
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
    categories: string[] | undefined;
    sort: 'priceAsc' | 'priceDesc' | 'newest' | 'oldest';
  };
  setFilters: (filters: {
    categories: undefined | string[];
    priceRange: string;
    sort: 'priceAsc' | 'priceDesc' | 'newest' | 'oldest';
  }) => void;
  setCategories: (categories: string[]) => void;
  setSort: (sort: 'priceAsc' | 'priceDesc' | 'newest' | 'oldest') => void;
  refetch: () => void;
}

const ProductListContext = createContext<ProductListContextType | null>(null);

export const ProductListProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [filters, setFilters] = useState<{
    categories: undefined | string[];
    priceRange: string;
    sort: 'priceAsc' | 'priceDesc' | 'newest' | 'oldest';
  }>({
    categories: [],
    priceRange: '',
    sort: 'newest',
  });

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();

      if (filters.categories?.length) {
        params.append('categories', filters.categories.join(','));
      }

      if (filters.sort) params.append('sort', filters.sort);

      const res = await fetch(`http://localhost:3001/products?${params}`);
      const data = await res.json();
      setProducts(data);

      router.push(`/shop?${params.toString()}`, { scroll: false });
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  }, [filters, router]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const setCategories = (categories: string[]) => {
    setFilters((prev) => ({ ...prev, categories }));
  };

  const setSort = (sort: 'priceAsc' | 'priceDesc' | 'newest' | 'oldest') => {
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
