import React from 'react';
import ProductGrid from '../ProductGrid';

const ShopProductsList = () => {
  return (
    <div className="lg:w-3/4">
      <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-6 shadow-lg shadow-black/10">
        <h2 className="text-xl font-semibold">Toàn bộ sản phẩm</h2>
        <span className="flex space-x-4">
          <select className="rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500">
            <option>Sắp xếp theo</option>
            <option>Giá: Thấp đến cao</option>
            <option>Giá: Cao đến thấp</option>
            <option>Mới nhất</option>
            <option>Bán chạy nhất</option>
          </select>
          <div className="flex rounded-xl border-1 border-gray-300">
            <button className="rounded-l-xl px-2 hover:bg-gray-100">⊞</button>
            <button className="rounded-r-xl px-2 hover:bg-gray-100">☰</button>
          </div>
        </span>
      </div>
      <ProductGrid className="mt-8 lg:grid-cols-3" />
    </div>
  );
};

export default ShopProductsList;
