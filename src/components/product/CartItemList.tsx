import React from 'react';
import { mockApi } from '../../../constants/data';

const CartItemList = () => {
  return (
    <div className="lg:w-2/3">
      <div className="rounded-2xl bg-white shadow-lg shadow-black/10">
        {/* Title */}
        <div className="from-shop_light_blue to-shop_dark_blue flex items-center justify-between rounded-t-2xl bg-gradient-to-r p-6 text-white">
          <span className="text-xl font-semibold">Sản phẩm trong giỏ</span>
          <span className="rounded-2xl bg-white/20 px-2 py-1 text-sm">
            4 sản phẩm
          </span>
        </div>
        {/* List Item */}
        {mockApi.featuredProducts.map((item) => (
          <div
            key={item.id}
            className="flex justify-between border-t-1 border-gray-300 p-8"
          >
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
                <button className="cursor-pointer px-4 py-2 hover:bg-gray-300">
                  -
                </button>
                <span className="px-4 py-2">1</span>
                <button className="cursor-pointer px-4 py-2 hover:bg-gray-300">
                  +
                </button>
              </div>
              <button className="mx-4 cursor-pointer">🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartItemList;
