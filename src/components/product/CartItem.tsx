'use client';

import React, { useState } from 'react';

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

const CartItem = ({ item }: { item: PropType }) => {
  const [numberItem, setNumberItem] = useState(1);
  return (
    <>
      <div className="flex">
        <div className={`mr-4 rounded-2xl p-8 text-3xl ${item.bgColor}`}>
          {item.icon}
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <div className="text-gray-500">
              Size: {item.variants[0]} | {'Màu: j đó'}
            </div>
          </div>
          <div className="flex gap-x-2">
            <span className="text-shop_dark_blue text-xl font-bold">
              {`${item.price}₫`}
            </span>
            {item.original_price && (
              <span className="text-gray-500 line-through">
                {item.original_price}₫
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center rounded-xl border-2 border-gray-400">
          <button
            className="cursor-pointer px-4 py-2 hover:bg-gray-300"
            onClick={() => setNumberItem(numberItem - 1)}
          >
            -
          </button>
          <span className="px-4 py-2">{numberItem}</span>
          <button
            className="cursor-pointer px-4 py-2 hover:bg-gray-300"
            onClick={() => setNumberItem(numberItem + 1)}
          >
            +
          </button>
        </div>
        <button className="mx-4 cursor-pointer">🗑️</button>
      </div>
    </>
  );
};

export default CartItem;
