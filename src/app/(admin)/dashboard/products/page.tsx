'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/common/Button';
import { Product } from '@/models/Product';
import Image from 'next/image';
import { formatCurrency } from '@/lib/utils';

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isOpenForm, setIsOpenForm] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const toggleForm = () => {
    setIsOpenForm(!isOpenForm);
  };
  return (
    <div className="flex flex-col space-y-8 px-8 py-4">
      <header className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">Quản Lý Sản phẩm</h1>
          <p className="text-gray-500">
            Quản lý danh mục và thông tin sản phẩm
          </p>
        </div>
        <div>
          <Button
            iconLeft="➕"
            className="rounded-xl bg-green-500 hover:bg-green-600"
            onClick={toggleForm}
          >
            Thêm sản phẩm
          </Button>
        </div>
      </header>
      <section className="grid justify-between gap-4 rounded-2xl bg-white px-6 py-4 md:grid-cols-5">
        <div className="flex flex-col gap-y-1">
          <label className="text-gray-500">Tìm kiếm</label>
          <input
            type="text"
            placeholder="Tên sản phẩm"
            className="rounded-lg border-1 border-gray-200 px-8 py-2"
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <label className="text-gray-500">Danh mục</label>
          <select className="rounded-lg border-1 border-gray-200 px-8 py-2">
            {/* <option>Tất cả</option>
            <option>Quản trị viên</option>
            <option>Khách hàng</option> */}
          </select>
        </div>
        <div className="flex flex-col gap-y-1">
          <label className="text-gray-500">Trạng thái</label>
          <select className="rounded-lg border-1 border-gray-200 px-8 py-2">
            {/* <option>Tất cả</option>
            <option>Hoạt động</option>
            <option>Tạm khóa</option>
            <option>Đã xóa</option> */}
          </select>
        </div>
        <div className="flex flex-col gap-y-1">
          <label className="text-gray-500">Giá</label>
          <select className="rounded-lg border-1 border-gray-200 px-8 py-2">
            <option>Tất cả</option>
            {/* <option>Hoạt động</option>
            <option>Tạm khóa</option>
            <option>Đã xóa</option> */}
          </select>
        </div>
        <div className="flex items-end">
          <Button variant="ghost" className="h-10 w-full border-1 bg-gray-50">
            Tìm kiếm
          </Button>
        </div>
      </section>

      {/* Product List */}
      <section className="grid grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id}>
            <div className="rounded-2xl shadow-md shadow-black/10 hover:shadow-lg">
              <div className="relative cursor-pointer">
                <div className="flex h-70 items-center justify-center">
                  <Image
                    src={product.images[0].url}
                    alt="product-img"
                    className="rounded-t-2xl object-cover"
                    fill
                    sizes="100%"
                  />
                </div>
                <div className="absolute inset-1 top-3 mx-3 flex justify-between">
                  {product.discountPercent !== 0 &&
                  product.discountPercent != undefined ? (
                    <div className="flex h-8 w-16 items-center justify-center rounded-2xl bg-red-600 font-semibold text-white">
                      {`-${product.discountPercent}%`}
                    </div>
                  ) : (
                    <></>
                  )}
                  {product.status && (
                    <div
                      className={`flex h-8 w-16 items-center justify-center rounded-2xl font-semibold ${product.status.includes('HOT') || product.status.includes('BEST') ? 'bg-yellow-400 text-black' : 'bg-green-400 text-white'}`}
                    >
                      {product.status}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-y-4 rounded-b-2xl bg-white p-6">
                <h3 className="truncate text-xl font-semibold">
                  {product.name}
                </h3>
                {/* <p className="line-clamp-2">{product.description}</p> */}
                <div className="flex gap-x-2">
                  {product.discountPercent === 0 ? (
                    <span className="text-shop_dark_blue text-2xl font-bold">
                      {formatCurrency(product.price)}
                    </span>
                  ) : (
                    <>
                      <span className="text-shop_dark_blue text-2xl font-bold">
                        {formatCurrency(
                          product.salePrice ? product.salePrice : product.price
                        )}
                      </span>
                      <span className="text-gray-500 line-through">
                        {formatCurrency(product.price)}
                      </span>
                    </>
                  )}
                </div>
                <span className="text-gray-500">
                  Kho:{' '}
                  {product.variants.reduce(
                    (accumulator, curr) => accumulator + curr.stock,
                    0
                  )}
                </span>
                <div className="flex gap-x-2">
                  <Button className="w-full rounded-xl">✏️ Sửa</Button>
                  <Button className="w-full rounded-xl" variant="danger">
                    🗑️ Xóa
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* add product form */}
      <div
        className={`${isOpenForm ? 'flex' : 'hidden'} fixed inset-0 z-10 items-center justify-center backdrop-blur-sm`}
      >
        <div className="w-full max-w-2xl rounded-2xl bg-white p-6">
          <h2 className="mb-4 text-xl font-semibold">Thêm Người Dùng Mới</h2>
          <div className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-1">
              <label>Tên sản phẩm</label>
              <input
                type="text"
                className="rounded-lg border-1 border-gray-100 p-2"
              />
            </div>
            <div className="flex gap-x-4">
              <div className="flex w-full flex-col gap-y-1">
                <label>Danh mục</label>
                <select className="rounded-lg border-1 border-gray-200 p-2">
                  <option>Chọn danh mục</option>
                </select>
              </div>
              <div className="flex w-full flex-col gap-y-1">
                <label>Thương hiệu</label>
                <input
                  type="text"
                  className="rounded-lg border-1 border-gray-100 p-2"
                />
              </div>
            </div>
            <div className="flex flex-col gap-y-1">
              <label>Giá bán(đ)</label>
              <input
                type="text"
                className="rounded-lg border-1 border-gray-100 p-2"
              />
            </div>
            <div className="flex gap-x-4">
              <div className="flex w-full flex-col gap-y-1">
                <label>Số lượng trong kho</label>
                <input
                  type="text"
                  className="rounded-lg border-1 border-gray-100 p-2"
                />
              </div>
              <div className="flex w-full flex-col gap-y-1">
                <label>SKU</label>
                <input
                  type="text"
                  className="rounded-lg border-1 border-gray-100 p-2"
                />
              </div>
            </div>
            <div className="flex flex-col gap-y-1">
              <label>Link ảnh sản phẩm</label>
              <input
                type="text"
                className="rounded-lg border-1 border-gray-100 p-2"
              />
            </div>
            <div className="flex flex-col gap-y-1">
              <label>Mô tả sản phẩm</label>
              <textarea
                rows={3}
                className="w-full rounded-lg border border-gray-300 p-2"
              ></textarea>
            </div>
            <div className="flex gap-x-2">
              <Button
                className="w-full rounded-xl border-1 border-green-500 text-green-500 hover:bg-gray-100"
                variant="outline"
                onClick={toggleForm}
              >
                Hủy
              </Button>
              <Button className="w-full rounded-xl bg-green-500 hover:bg-green-600">
                Thêm người dùng
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
