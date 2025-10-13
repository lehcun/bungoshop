'use client';

import React, { useEffect, useState } from 'react';

import { mockFilters } from '../../constants/data';
import { Category } from '@/models/Product';
import { useProductListContext } from '@/contexts/ProductListContext';

const ProductFilter = () => {
  const { filters, setFilters } = useProductListContext();
  const [categories, setCategories] = useState<Category[]>([]);

  //fetch Danh muc tu backend
  useEffect(() => {
    fetch('http://localhost:3001/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data));
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
  };

  return (
    <div className="lg:w-1/4">
      <div className="top-24 lg:sticky">
        <section className="rounded-2xl bg-white px-4 py-8 shadow-lg shadow-black/10">
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Bộ lọc</h2>{' '}
            <div>
              <h3 className="my-2 text-lg font-semibold">Danh mục</h3>
              <div className="flex flex-col gap-y-1.5">
                {categories.map((item) => (
                  <span key={item.id} className="flex">
                    <input
                      type="checkbox"
                      checked={filters.categories?.includes(item.name)}
                      onChange={() => toggleCategory(item.name)}
                    />
                    <span className="ml-2 text-center">{item.name}</span>
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="my-2 text-lg font-semibold">Khoảng giá</h3>
              <div className="flex flex-col gap-y-1.5">
                {mockFilters.priceRanges.map((item) => (
                  <label key={item.id} className="flex">
                    <input type="radio" name="price" />
                    <span className="ml-2 text-center">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
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
