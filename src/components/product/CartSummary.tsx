'use client';

import React, { useContext } from 'react';
import * as motion from 'motion/react-client';
import { CartContext } from '@/contexts/CartContext';

const CartSummary = () => {
  const { cart } = useContext(CartContext);
  const totalDiscount = cart.reduce(
    (sum, item) =>
      sum +
      (item.original_price != null ? item.original_price - item.price : 0),
    0
  );
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
  return (
    <div className="lg:w-1/3">
      <div className="rounded-2xl bg-white p-4 shadow-lg shadow-black/10">
        <h3 className="py-2 text-xl font-semibold">Tóm tắt đơn hàng</h3>
        {/* Discount */}
        <div className="my-2">
          <p className="text-sm">Mã giảm giá</p>
          <div className="my-2 flex gap-x-2">
            <input
              type="text"
              placeholder="Nhập mã giảm giá"
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
            <button className="rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600">
              Áp dụng
            </button>
          </div>
        </div>
        {/* Price calculator */}
        <div>
          <div className="flex flex-col border-b-1 border-gray-300 py-2">
            <div className="my-1 flex justify-between">
              <span>Tạm tính:</span>
              <span>{totalPrice}₫</span>
            </div>
            <div className="my-1 flex justify-between">
              <span>Giảm giá:</span>
              <span className="text-red-600">-${totalDiscount}₫</span>
            </div>
            <div className="my-1 flex justify-between">
              <span>Phí vận chuyển:</span>
              <span>Miễn phí</span>
            </div>
          </div>
          <div className="">
            <div className="flex justify-between py-4 font-semibold">
              <span>Tổng cộng:</span>
              <span className="text-shop_dark_blue text-xl">
                {totalPrice - totalDiscount}₫
              </span>
            </div>
          </div>
        </div>
        <motion.div
          className="from-shop_light_blue/70 to-shop_light_blue w-full cursor-pointer rounded-2xl bg-gradient-to-r py-4 text-center text-xl text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <button>💳 Thanh toán</button>
        </motion.div>
        {/* payment method */}
        <div className="py-4 text-center text-gray-500">
          <h3>Phương thức thanh toán:</h3>
          <div className="my-2 flex justify-center space-x-3">
            <div className="flex h-6 w-10 cursor-pointer items-center justify-center rounded bg-blue-600 text-xs text-white hover:opacity-80">
              VISA
            </div>
            <div className="flex h-6 w-10 cursor-pointer items-center justify-center rounded bg-red-600 text-xs text-white hover:opacity-80">
              MC
            </div>
            <div className="flex h-6 w-10 cursor-pointer items-center justify-center rounded bg-green-600 text-xs text-white hover:opacity-80">
              ATM
            </div>
            <div className="flex h-6 w-10 cursor-pointer items-center justify-center rounded bg-purple-600 text-xs text-white hover:opacity-80">
              COD
            </div>
          </div>
        </div>
        {/* footer */}
        <div className="my-2 rounded-xl bg-green-50 p-4 text-green-500">
          <p className="text-green-700">🔒 Thanh toán an toàn & bảo mật</p>
          <p className="text-sm">Thông tin của bạn được mã hóa SSL 256-bit</p>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
