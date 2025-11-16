'use client';

import { useCategories } from '@/hook/useCategories';
import { Category } from '@/models/Product';
import React from 'react';
import NewProductImages from './NewImages';
import NewVariants from './NewVariants';

const AddProductForm = () => {
  const { categories } = useCategories();

  return (
    <div className="space-y-8">
      {/* Sản phẩm chính */}
      <section className="space-y-2 rounded-2xl bg-white p-8">
        <h2 className="text-2xl font-semibold">ℹ️ Thông Tin Cơ Bản</h2>
        <div className="flex space-x-4">
          <div className="flex flex-1 flex-col gap-y-1">
            <label>
              Tên sản phẩm <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="rounded-lg border-1 border-gray-100 p-2"
            />
          </div>
          <div className="flex flex-1 flex-col gap-y-1">
            <label>Slug</label>
            <input
              type="text"
              className="rounded-lg border-1 border-gray-100 p-2"
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-1">
          <label>Mô tả sản phẩm</label>
          <textarea
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2"
          ></textarea>
        </div>
        <div className="flex space-x-4">
          <div className="flex flex-1 flex-col gap-y-1">
            <label>
              Giá cơ bản (VNĐ) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="rounded-lg border-1 border-gray-100 p-2"
            />
          </div>
          <div className="flex flex-1 flex-col gap-y-1">
            <label>Trạng thái</label>
            <select
              name="status"
              required
              className="input-focus w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Chọn trạng thái</option>
              <option value="HOT">🔥 HOT</option>
              <option value="NEW">✨ NEW</option>
              <option value="SALE">💥 SALE</option>
              <option value="NORMAL">📦 NORMAL</option>
            </select>
          </div>

          <div className="flex flex-1 flex-col gap-y-1">
            <label>
              Danh mục <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              required
              className="input-focus w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Chọn Danh mục</option>
              {categories?.map((category: Category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>
      <NewProductImages />
      <NewVariants />
    </div>
  );
};

export default AddProductForm;
