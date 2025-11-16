'use client';

import React, { useEffect, useState } from 'react';
import { Category } from '@/models/Product';
import { useProductListContext } from '@/contexts/ProductListContext';
import { Brand } from '@/models/Brand';
import { useCategories } from '@/hook/useCategories';

const ProductFilter = () => {
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

  const { filters, setFilters, setPage } = useProductListContext();
  const { categories } = useCategories();
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/brands')
      .then((res) => res.json())
      .then((data) => setBrands(data));
  }, []);

  //Toggle danh muc
  const toggleCategory = (name: string) => {
    const exists: boolean = filters.categories?.includes(name) ?? false;
    const newCats: string[] = exists
      ? (filters.categories?.filter((c: string) => c !== name) ?? [])
      : [...(filters.categories ?? []), name];
    setFilters({
      ...filters,
      categories: newCats,
      priceRange: '',
    });
    setPage(1);
  };

  //Toggle muc gia
  const togglePrice = (price: string) => {
    setFilters({
      ...filters,
      priceRange: price,
    });
    setPage(1);
  };

  //Toggle Hang
  const toggleBrand = (name: string) => {
    const exists: boolean = filters.brands?.includes(name) ?? false;
    const newCats: string[] = exists
      ? (filters.brands?.filter((c: string) => c !== name) ?? [])
      : [...(filters.brands ?? []), name];
    setFilters({
      ...filters,
      brands: newCats,
      priceRange: '',
    });
    setPage(1);
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
                {brands.map((brand) => (
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
            {/* <div>
              <h3 className="my-2 text-lg font-semibold">Size</h3>
              <div className="flex flex-wrap gap-x-2">
                {mockFilters.sizes.map((size) => (
                  <span
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`text-md hover:text-shop_dark_blue hover:border-shop_dark_blue flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 ${
                      sizeSelected.includes(size)
                        ? 'from-shop_light_blue to-shop_dark_blue hover:text-shop_dark_blue bg-red-200 bg-gradient-to-br text-white'
                        : 'border-black text-black'
                    }`}
                  >
                    <div>{size}</div>
                  </span>
                ))}
              </div>
            </div> */}
            {/* <motion.div
              className="from-shop_light_blue/70 to-shop_light_blue mt-2 cursor-pointer rounded-2xl bg-gradient-to-r py-4 text-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={applyFilter}
            >
              <button>Áp dụng bộ lọc</button>
            </motion.div> */}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductFilter;
