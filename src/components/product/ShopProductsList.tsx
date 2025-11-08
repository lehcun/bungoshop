'use client';

import React from 'react';
import ProductGrid from '../ProductGrid';
import { useProductListContext } from '@/contexts/ProductListContext';
import Pagination from './Pagination';

const ShopProductsList = () => {
  const { filters, setSort } = useProductListContext();

  return (
    <div className="lg:w-3/4">
      <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-6 shadow-lg shadow-black/10">
        <h2 className="text-xl font-semibold">Toàn bộ sản phẩm</h2>
        <span className="flex space-x-4">
          <select
            className="rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
            value={
              filters.sort === 'newest'
                ? 'date_newest'
                : filters.sort === 'oldest'
                  ? 'date_oldest'
                  : filters.sort === 'priceAsc'
                    ? 'price_asc'
                    : filters.sort === 'priceDesc'
                      ? 'price_desc'
                      : 'default'
            }
            onChange={(e) => {
              const value = e.target.value;
              switch (value) {
                case 'date_newest':
                  setSort('newest');
                  break;
                case 'date_oldest':
                  setSort('oldest');
                  break;
                case 'price_asc':
                  setSort('priceAsc');
                  break;
                case 'price_desc':
                  setSort('priceDesc');
                  break;
                default:
                  setSort('default');
                  break;
              }
            }}
          >
            <option value="default">Sắp xếp theo</option>
            <option value="date_newest">Mới nhất</option>
            <option value="date_oldest">Cũ nhất</option>
            <option value="price_asc">Giá: Thấp đến cao</option>
            <option value="price_desc">Giá: Cao đến thấp</option>
            <option>Bán chạy nhất</option>
          </select>
          <div className="flex rounded-xl border-1 border-gray-300">
            <button className="rounded-l-xl px-2 hover:bg-gray-100">⊞</button>
            <button className="rounded-r-xl px-2 hover:bg-gray-100">☰</button>
          </div>
        </span>
      </div>
      <ProductGrid className="mt-8 lg:grid-cols-3" />
      <Pagination />
    </div>
  );
};

export default ShopProductsList;
