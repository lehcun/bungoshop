import { useProductFilter } from './useProductFilter';

let initialized = false;

export const initProductFilterUrlSync = () => {
  if (initialized) return;
  initialized = true;

  useProductFilter.subscribe((state) => {
    const params = new URLSearchParams();

    state.categories.forEach((c) => params.append('categories', c));
    state.brands.forEach((b) => params.append('brands', b));
    if (state.priceRange) params.set('priceRange', state.priceRange);
    if (state.sort !== 'default') params.set('sort', state.sort);
    if (state.page > 1) params.set('page', String(state.page));

    const query = params.toString();
    const newUrl = query
      ? `${window.location.pathname}?${query}`
      : window.location.pathname;

    if (window.location.search === `?${query}`) return;

    window.history.replaceState(null, '', newUrl);
  });
};
