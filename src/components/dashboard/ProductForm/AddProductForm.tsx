'use client';

import { useCategories } from '@/hook/useCategories';
import { Category } from '@/models/Product';
import React, { useState } from 'react';
import NewProductImages from './NewProductImages';
import NewVariants from './NewProductVariants';
import Button from '@/components/ui/Button';
import { useCreateProduct } from '@/hook/products/useCreateProduct';

export interface Image {
  url: string;
  alt: string;
}

export interface Variant {
  sku: string;
  color: string;
  size: string;
  price: string;
  stock: string;
  urlImg: string;
}

export interface ProductForm {
  name: string;
  slug: string;
  description: string;
  price: string;
  status: string;
  categoryId: string;
  images: Image[];
  variants: Variant[];
}

const AddProductForm = () => {
  const { categories } = useCategories();
  const { createProduct } = useCreateProduct();
  const [form, setForm] = useState<ProductForm>({
    name: '',
    slug: '',
    description: '',
    price: '',
    status: '',
    categoryId: '',
    images: [],
    variants: [],
  });

  const handleSubmit = () => {
    const payload = {
      ...form,
      price: Number(form.price),
      variants: form.variants.map((v) => ({
        ...v,
        price: Number(v.price),
        stock: Number(v.stock),
      })),
    };

    try {
      createProduct(payload);
    } catch (err) {
      console.log(err);
    }
  };

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
              value={form.name}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div className="flex flex-1 flex-col gap-y-1">
            <label>Slug</label>
            <input
              type="text"
              className="rounded-lg border-1 border-gray-100 p-2"
              value={form.slug}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, slug: e.target.value }))
              }
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-1">
          <label>Mô tả sản phẩm</label>
          <textarea
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2"
            value={form.description}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, description: e.target.value }))
            }
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
              value={form.price}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, price: e.target.value }))
              }
            />
          </div>
          <div className="flex flex-1 flex-col gap-y-1">
            <label>Trạng thái</label>
            <select
              name="status"
              required
              className="input-focus w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              value={form.status}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, status: e.target.value }))
              }
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
              value={form.categoryId}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, categoryId: e.target.value }))
              }
            >
              <option>Chọn Danh mục</option>
              {categories?.map((category: Category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>
      <NewProductImages
        onChange={(imgs) => setForm((prev) => ({ ...prev, images: imgs }))}
      />
      <NewVariants
        onChange={(vars) => setForm((prev) => ({ ...prev, variants: vars }))}
      />
      <div className="flex justify-center">
        <Button className="p-5 text-2xl" onClick={handleSubmit}>
          Tạo sản phẩm mới
        </Button>
      </div>
    </div>
  );
};

export default AddProductForm;
