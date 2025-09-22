import React, { useState } from 'react';
import { mockApi } from '../../../constants/data';
import CartItem from './CartItem';

const CartItemList = () => {
  const [quantity, setQuantity] = useState();
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
            <CartItem item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartItemList;
