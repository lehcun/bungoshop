'use client';

import React, { useState } from 'react';
import * as motion from 'motion/react-client';

interface PropType {
  id: string | number;
  bgColor: string | null;
  icon: React.ReactNode;
  discount?: string | null;
  badges: string[];
  name: string;
  description: string;
  reviews_count: number;
  price: number;
  original_price?: number | null;
  variants: string[];
}

const ProductCard = ({ product }: { product: PropType }) => {
  const [sizeSelected, setSizeSelected] = useState('');

  return (
    <div>
      <div key={product.id}>
        <div className="rounded-3xl shadow-lg shadow-black/20">
          <div className="relative">
            <div
              className={`${product.bgColor} flex h-80 items-center justify-center rounded-t-2xl`}
            >
              <span className="text-8xl">{product.icon}</span>
            </div>
            <div className="absolute inset-1 top-3 mx-3 flex justify-between">
              {product.discount ? (
                <div className="flex h-8 w-16 items-center justify-center rounded-2xl bg-red-600 font-semibold text-white">
                  {product.discount}
                </div>
              ) : (
                <></>
              )}
              {product.badges[0] ? (
                <div className="flex h-8 w-16 items-center justify-center rounded-2xl bg-yellow-400 font-semibold text-black">
                  {product.badges[0]}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-y-4 rounded-b-2xl bg-white p-6">
            <h3 className="truncate text-xl font-semibold">{product.name}</h3>
            <p className="line-clamp-2">{product.description}</p>
            <div className="flex">
              {/* <span>{product.rating}</span> */}
              <span>⭐⭐⭐⭐⭐</span>
              <span className="text-gray-700">{`(${product.reviews_count} đánh giá)`}</span>
            </div>
            <div className="flex gap-x-2">
              <span className="text-shop_dark_blue text-2xl font-bold">
                {`${product.price}₫`}
              </span>
              {product.original_price ? (
                <span className="text-gray-500 line-through">
                  {`${product.original_price}₫`}
                </span>
              ) : (
                ''
              )}
            </div>
            {/* Size */}
            <div className="flex items-center justify-between">
              <span>Size:</span>
              <div className="flex space-x-2">
                {product.variants.map((variant, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSizeSelected(variant)}
                  >
                    <span
                      className={`text-md hover:text-shop_dark_blue flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 ${
                        sizeSelected === variant
                          ? 'from-shop_light_blue to-shop_dark_blue hover:text-shop_dark_blue bg-red-200 bg-gradient-to-br text-white'
                          : 'border-black text-black'
                      }`}
                    >
                      <div className={`bg-${variant}-300`}>{variant}</div>
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div
              className="from-shop_light_blue/70 to-shop_light_blue cursor-pointer rounded-2xl bg-gradient-to-r py-4 text-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <button>🛒 Thêm vào giỏ</button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
