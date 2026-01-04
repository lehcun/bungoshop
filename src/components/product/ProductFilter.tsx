import React, { useEffect } from 'react';
import { Brand } from '@/models/Brand';
import { Category } from '@/models/Product';
import { useCategories } from '@/hook/useCategories';
import { SortType, useProductFilter } from '@/hook/store/useProductFilter';
import { useBrands } from '@/hook/useBrands';
import { useSearchParams } from 'next/navigation';

const ProductFilter = ({
  filters,
}: {
  filters: {
    categories: string[];
    brands: string[];
    sort: SortType;
    priceRange: string;
  };
}) => {
  const priceRanges = [
    { id: 1, label: 'Dưới 500k', range: '0-500' },
    {
      id: 2,
      label: '500k - 1tr',
      range: '500-1000',
    },
    {
      id: 3,
      label: '1tr - 2tr',
      range: '1000-2000',
    },
    { id: 4, label: 'Trên 2tr', range: '2000+' },
  ];
  const { setFilters, setPage, resetFilters } = useProductFilter();
  const { categories } = useCategories();
  const { brands } = useBrands();
  const searchParams = useSearchParams();

  useEffect(() => {
    const currCategories = filters.categories;
    const currPriceRange = filters.priceRange;
    const currBrands = filters.brands;
    const currSort = filters.sort;

    const params = new URLSearchParams(searchParams.toString());
    const categoriesFromUrl = params.getAll('categories');
    const brandsFromUrl = params.getAll('brands');
    const priceFromUrl = params.get('priceRange');
    const sortFromUrl = params.get('sort') || 'default';

    // if (sortFromUrl && sortFromUrl !== 'default') {
    //   newFilters.sort = sortFromUrl;
    // }

    const categoriesEqual =
      currCategories.length === categoriesFromUrl.length &&
      categoriesFromUrl.every((cat) => currCategories.includes(cat));

    const brandsEqual =
      currBrands.length === brandsFromUrl.length &&
      brandsFromUrl.every((brand) => currBrands.includes(brand));

    const priceEqual = priceFromUrl === currPriceRange;
    // const sortEqual = sortFromUrl === currentSort;

    // Chỉ update nếu có sự khác biệt thực sự
    if (!(categoriesEqual && brandsEqual && priceEqual)) {
      const newFilters: Partial<typeof filters> = {};

      if (!categoriesEqual)
        newFilters.categories =
          categoriesFromUrl.length > 0 ? categoriesFromUrl : [];
      if (!brandsEqual)
        newFilters.brands = brandsFromUrl.length > 0 ? brandsFromUrl : [];
      if (!priceEqual)
        newFilters.priceRange = priceFromUrl ? priceFromUrl : undefined;

      setFilters(newFilters);
      setPage(1);
    }
  }, [searchParams, setFilters, setPage, filters]);

  //Toggle danh muc
  const toggleCategory = (name: string) => {
    const exists: boolean = filters.categories?.includes(name) ?? false;
    const newCats: string[] = exists
      ? (filters.categories?.filter((c: string) => c !== name) ?? [])
      : [...(filters.categories ?? []), name];
    setFilters({ categories: newCats });
    setPage(1);
  };

  //Toggle muc gia
  const togglePrice = (price: string) => {
    setFilters({ priceRange: price });
    setPage(1);
  };

  //Toggle Hang
  const toggleBrand = (name: string) => {
    const exists: boolean = filters.brands?.includes(name) ?? false;
    const newBras: string[] = exists
      ? (filters.brands?.filter((c: string) => c !== name) ?? [])
      : [...(filters.brands ?? []), name];
    setFilters({ brands: newBras });
    setPage(1);
  };

  const toggleResetFilter = () => {
    resetFilters();
  };

  return (
    <div className="lg:w-1/4">
      <div className="top-24 lg:sticky">
        <section className="rounded-2xl bg-white px-4 py-8 shadow-lg shadow-black/10">
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Bộ lọc</h2>{' '}
            <section>
              <h3 className="my-2 text-lg font-semibold">Danh mục</h3>
              <div className="flex flex-col gap-y-1.5">
                {categories?.map((category: Category) => (
                  <span key={category.id} className="flex">
                    <input
                      type="checkbox"
                      checked={!!filters.categories.includes(category.name)}
                      onChange={() => toggleCategory(category.name)}
                    />
                    <span className="ml-2 text-center">{category.name}</span>
                  </span>
                ))}
              </div>
            </section>
            <section>
              <h3 className="my-2 text-lg font-semibold">Khoảng giá</h3>
              <div className="flex flex-col gap-y-1.5">
                {priceRanges.map((item) => (
                  <label key={item.id} className="flex">
                    <input
                      type="radio"
                      name="price"
                      checked={filters.priceRange === item.range}
                      onChange={() => togglePrice(item.range)}
                    />
                    <span className="ml-2 text-center">{item.label}</span>
                  </label>
                ))}
              </div>
            </section>
            <section>
              <h3 className="my-2 text-lg font-semibold">Hãng</h3>
              <div className="flex flex-col gap-y-1.5">
                {brands?.map((brand: Brand) => (
                  <span key={brand.id} className="flex">
                    <input
                      type="checkbox"
                      checked={!!filters.brands?.includes(brand.name)}
                      onChange={() => toggleBrand(brand.name)}
                    />
                    <span className="ml-2 text-center">{brand.name}</span>
                  </span>
                ))}
              </div>
            </section>
            <button
              className="text-shop_btn_blue underline underline-offset-auto"
              onClick={toggleResetFilter}
            >
              reset bộ lọc
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductFilter;
