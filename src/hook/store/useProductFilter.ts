'use client';

import { create, StateCreator } from 'zustand';

export type SortType =
  | 'priceAsc'
  | 'priceDesc'
  | 'newest'
  | 'oldest'
  | 'default';

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

// Middleware đồng bộ filters → URL (type-safe)
const urlSyncMiddleware: (
  config: StateCreator<ProductFilterState>
) => StateCreator<ProductFilterState> = (config) => (set, get, api) =>
  config(
    (partial) => {
      // Cập nhật state trước
      set(partial);

      // Lấy state mới nhất sau khi đã update
      const state = get();
      console.log(state);

      // Tạo query params
      const params = new URLSearchParams();

      state.categories.forEach((cat) => params.append('categories', cat));
      state.brands.forEach((brand) => params.append('brands', brand));

      if (state.priceRange) {
        params.set('priceRange', state.priceRange);
      }

      if (state.sort && state.sort !== 'default') {
        params.set('sort', state.sort);
      }

      const query = params.toString();
      const newUrl = query
        ? `${window.location.pathname}?${query}`
        : window.location.pathname;

      // Cập nhật URL mà không reload và không tạo history mới
      window.history.replaceState(null, '', newUrl);
    },
    get,
    api
  );

export const useProductFilter = create<ProductFilterState>(
  urlSyncMiddleware((set) => ({
    categories: [],
    brands: [],
    sort: 'default' as SortType,
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
  }))
);
