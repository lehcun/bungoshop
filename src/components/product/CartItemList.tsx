'use client';

import { useCartContext } from '@/contexts/CartContext';
import CartItemDetail from './CartItemDetail';
import { useAuth } from '@/contexts/AuthContext';

const CartItemList = () => {
  const { user } = useAuth();
  const { carts } = useCartContext();
  if (!user) {
    return <h1>Loading</h1>;
  }
  const totalQuantity = carts.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="lg:w-2/3">
      <div className="rounded-2xl bg-white shadow-lg shadow-black/10">
        {/* Title */}
        <div className="from-shop_light_blue to-shop_dark_blue flex items-center justify-between rounded-t-2xl bg-gradient-to-r p-6 text-white">
          <span className="text-xl font-semibold">Sản phẩm trong giỏ</span>
          <span className="rounded-2xl bg-white/20 px-2 py-1 text-sm">
            {totalQuantity} sản phẩm
          </span>
        </div>
        {/* List Item */}
        {carts.map((item) => {
          return (
            <div
              key={item.id}
              className="flex justify-between border-t-1 border-gray-300 p-8"
            >
              <CartItemDetail item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CartItemList;
