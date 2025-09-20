'use client';

import React, { useState } from 'react';
import * as motion from 'motion/react-client';

import { mockFilters } from '../../../constants/data';

const ProductFilter = () => {
  const [sizeSelected, setSizeSelected] = useState<string[]>([]);

  const toggleSize = (size: string) => {
    if (sizeSelected.includes(size)) {
      setSizeSelected(sizeSelected.filter((s) => s != size));
    } else {
      setSizeSelected([...sizeSelected, size]);
    }
  };

  const filterApply = () => {
    return 1;
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
                {mockFilters.categories.map((item) => (
                  <span key={item.id} className="flex">
                    <input type="checkbox" />
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
            <div>
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
            </div>
            <motion.div
              className="from-shop_light_blue/70 to-shop_light_blue mt-2 cursor-pointer rounded-2xl bg-gradient-to-r py-4 text-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => filterApply()}
            >
              <button>Áp dụng bộ lọc</button>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductFilter;
