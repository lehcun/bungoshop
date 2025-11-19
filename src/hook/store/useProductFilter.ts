'use client';

import { create } from 'zustand';

type SortType = 'priceAsc' | 'priceDesc' | 'newest' | 'oldest' | 'default';

interface ProductFilterState {
  categories: string[];
  brands: string[];
  sort: SortType;
  priceRange: string;
  page: number;
  setFilters: (
    filters: Partial<
      Omit<ProductFilterState, 'setFilters' | 'setSort' | 'setPage'>
    >
  ) => void;
  setPage: (page: number) => void;
  setSort: (sort: SortType) => void;
  resetFilters: () => void;
}

export const useProductFilter = create<ProductFilterState>((set) => ({
  categories: [],
  brands: [],
  sort: 'default',
  priceRange: '',
  page: 1,

  setFilters: (filters) =>
    set((state) => ({
      ...state,
      ...filters,
      page: 1,
    })),

  setPage: (page) => set(() => ({ page })),

  setSort: (sort) =>
    set(() => ({
      sort,
      page: 1,
    })),

  resetFilters: () =>
    set(() => ({
      categories: [],
      brands: [],
      sort: 'default',
      priceRange: '',
      page: 1,
    })),
}));
