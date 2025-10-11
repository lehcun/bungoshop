'use client';

import { formatCurrency } from '@/lib/utils';
import { Product } from '@/models/Product';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const ProductDisplay = ({ productId }: { productId: string }) => {
  const [colorSelected, setColorSelected] = useState<string | null>(null);
  const [sizeSelected, setSizeSelected] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [product, setProduct] = useState<Product | null>(null);

  // Khởi tạo 2 mảng chứa size và color của product ko trùng
  const colorsVar = product?.variants.map((varient) => varient.color);
  const uniqueColorArr = [...new Set(colorsVar)];
  // console.log(uniqueColorArr);

  const sizeVar = product?.variants.map((varient) => varient.size);
  const uniqueSizeArr = [...new Set(sizeVar)];
  // console.log(uniqueSizeArr);

  useEffect(() => {
    fetch(`http://localhost:3001/products/${productId}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [productId]);

  //Làm Loading sau
  if (!product) return <div>Loading...</div>;

  return (
    <section className="w-full bg-white">
      <div className="flex space-x-8 p-4">
        {/* Image */}
        <div>
          <Image
            src={product?.images[0].url}
            alt="tets"
            width={600}
            height={255}
            className="object-cover"
          />
        </div>
        {/* Detail */}
        <div>
          <div>
            <h2 className="text-xl">{product?.name}</h2>
            <div className="my-2 flex">
              <p>
                3.9 <span>⭐⭐⭐⭐⭐</span>
              </p>
              <p className="ml-4 border-l-1 border-gray-300 pl-4">
                84 <span className="text-sm text-gray-500">Đánh giá</span>
              </p>
            </div>
          </div>

          {/* Price Discount... */}
          <div>
            <div className="flex items-center space-x-2 bg-gray-50 px-4 py-2">
              <span className="text-shop_dark_blue text-4xl">
                {formatCurrency(
                  (product?.price * (100 - product.discount)) / 100
                )}
              </span>
              <span className="text-gray-400 line-through">
                {formatCurrency(product?.price)}
              </span>
              <span className="text-shop_dark_blue rounded-sm bg-blue-300 px-1 text-sm font-semibold">
                -{product.discount}%
              </span>
            </div>
            <div className="flex flex-col space-y-4">
              <section className="flex items-center gap-x-4 px-4 py-2">
                <label className="w-25 text-gray-400">Vận Chuyển</label>
                <div>Nhận từ 6 Th10 - 8 Th10, phí giao 0₫</div>
              </section>

              <section className="flex items-center gap-x-4 px-4 py-2">
                <label className="w-25 text-gray-400">Màu sắc</label>
                <div className="flex space-x-2">
                  {uniqueColorArr.map((color) => (
                    <button
                      key={color}
                      className={`hover:border-shop_dark_blue hover:text-shop_dark_blue min-w-20 border-1 border-gray-300 p-2 ${
                        color === colorSelected
                          ? 'border-shop_dark_blue text-shop_dark_blue'
                          : ''
                      }`}
                      onClick={() =>
                        setColorSelected((prev) =>
                          prev === color ? null : color
                        )
                      }
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </section>

              <section className="flex items-center gap-x-4 px-4 py-2">
                <label className="w-25 text-gray-400">Size</label>
                <div className="flex space-x-2">
                  {uniqueSizeArr.map((size) => (
                    <button
                      key={size}
                      className={`hover:border-shop_dark_blue hover:text-shop_dark_blue min-w-20 border-1 border-gray-300 p-2 ${
                        size === sizeSelected
                          ? 'border-shop_dark_blue text-shop_dark_blue'
                          : ''
                      }`}
                      onClick={() =>
                        setSizeSelected((prev) => (prev === size ? null : size))
                      }
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </section>
              <section className="flex items-center gap-x-4 px-4 py-2">
                <label className="w-25 text-gray-400">Số lượng</label>
                <div>
                  <button
                    className="h-8 w-8 border-1 border-gray-400"
                    onClick={() => setQuantity(quantity - 1)}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    className="text-shop_dark_blue h-8 w-10 border-y-1 border-gray-400 text-center"
                    value={quantity}
                  />
                  <button
                    className="h-8 w-8 border-1 border-gray-400"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </section>
              <section>2 Cái nút thêm và mua ngay</section>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDisplay;
