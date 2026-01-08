'use client';

import React, { useState } from 'react';
import * as motion from 'motion/react-client';
import { formatCurrency } from '@/lib/utils';
import { CartItem } from '@/models/Product';
import { Address } from '@/models/User';
import CheckoutAddress from '../address/CheckoutAddress';
import { useCart } from '@/hook/cart/useCart';

const CartSummary = () => {
  const { carts } = useCart();
  //Luu address da chon
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  console.log(selectedAddress);
  const handlePayment = async () => {
    try {
      const res = await fetch('http://localhost:3001/orders/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethod: 'COD',
          shippingAddressId: selectedAddress?.id,
        }),
        credentials: 'include',
      });
      if (!res.ok) throw new Error('can not POST payment');
    } catch (err) {
      console.log(err);
    }
  };

  const totalDiscount = carts?.reduce(
    (sum: number, item: CartItem) =>
      sum + (item.product.price - item.priceAtAdd) * item.quantity,
    0
  );
  const totalPrice = carts?.reduce(
    (sum: number, item: CartItem) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="space-y-8 lg:w-1/3">
      <div className="rounded-2xl bg-white p-4 shadow-lg shadow-black/10">
        <h3 className="py-2 text-xl font-semibold">Tóm tắt đơn hàng</h3>
        {/* Price calculator */}
        <div>
          <div className="flex flex-col border-b-1 border-gray-300 py-2">
            <div className="my-1 flex justify-between">
              <span>Tạm tính:</span>
              <span>{formatCurrency(totalPrice)}</span>
            </div>
            <div className="my-1 flex justify-between">
              <span>Giảm giá:</span>
              <span className="text-red-600">
                -${formatCurrency(totalDiscount)}
              </span>
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
                {formatCurrency(totalPrice - totalDiscount)}
              </span>
            </div>
          </div>
        </div>
        <motion.div
          className="from-shop_light_blue/70 to-shop_light_blue w-full cursor-pointer rounded-2xl bg-gradient-to-r py-4 text-center text-xl text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePayment}
        >
          <>💳 Thanh toán</>
        </motion.div>
        {/* payment method */}
        {/* <div className="py-4 text-center text-gray-500">
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
        </div> */}
        {/* footer */}
        {/* <div className="my-2 rounded-xl bg-green-50 p-4 text-green-500">
          <p className="text-green-700">🔒 Thanh toán an toàn & bảo mật</p>
          <p className="text-sm">Thông tin của bạn được mã hóa SSL 256-bit</p>
        </div> */}
      </div>

      <CheckoutAddress
        selectedAddress={selectedAddress}
        setSelectedAddress={setSelectedAddress}
      />
    </div>
  );
};

export default CartSummary;
