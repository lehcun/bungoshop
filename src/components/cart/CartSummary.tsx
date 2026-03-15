'use client';

import React, { useState } from 'react';
import * as motion from 'motion/react-client';
import toast from 'react-hot-toast';
import { formatCurrency } from '@/lib/utils';
import { CartItem } from '@/models/Product';
import { Address } from '@/models/User';
import { useCheckout } from '@/hook/checkout/useCheckout';
import CheckoutAddress from '../address/CheckoutAddress';
import { useCreatePayment } from '@/hook/checkout/useCreatePayment';

export type PaymentType = 'VNPay' | 'MOMO' | 'ATM' | 'COD';

const CartSummary = ({ selectedItems }: { selectedItems: CartItem[] }) => {
  //Luu address da chon
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const { createOrder } = useCheckout();
  const { createPayment } = useCreatePayment();

  //Luu phuong thuc thanh toan
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentType | null>(null);

  const paymentList = [
    {
      name: 'VNPay' as PaymentType,
      style: 'bg-blue-600',
      noneSelectedStyle: 'bg-blue-200 border-blue-400 border-1',
    },
    {
      name: 'MOMO' as PaymentType,
      style: 'bg-momo',
      noneSelectedStyle: 'bg-momo/20 border-momo/60 border-1',
    },
    {
      name: 'ATM' as PaymentType,
      style: 'bg-green-600',
      noneSelectedStyle: 'bg-green-200 border-green-400 border-1',
    },
    {
      name: 'COD' as PaymentType,
      style: 'bg-purple-600',
      noneSelectedStyle: 'bg-purple-200 border-purple-400 border-1',
    },
  ];

  const handleSelectPaymentMethod = (selectPayment: PaymentType) => {
    if (selectPayment === selectedPaymentMethod) {
      setSelectedPaymentMethod(null);
    } else {
      setSelectedPaymentMethod(selectPayment);
    }
  };

  const handlePayment = async () => {
    if (selectedPaymentMethod && selectedAddress) {
      //Tạm giữ hàng ở đây
      const { order, message } = await createOrder({
        paymentMethod: selectedPaymentMethod,
        shippingAddressId: selectedAddress.id,
      });

      const orderId = order?.id;

      if (selectedPaymentMethod.includes('VNPay')) {
        //Goi hook payment
        const url = createPayment({
          amount: totalPrice,
          info: `Thanh toan cho don hang ${order.id} `,
          orderId,
        });
        console.log(url);

        console.log({
          amount: totalPrice,
          info: `Thanh toan cho don hang ${order} `,
        });
      }
    } else {
      toast.error('Chưa có địa chỉ hoặc là lỗi phương thức');
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
      <div className="bg-shop_bg rounded-2xl p-4 shadow-lg shadow-black/10">
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
                -{formatCurrency(totalDiscount)}đ
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
        <div className="py-4 text-center text-gray-500">
          <h3>Phương thức thanh toán:</h3>
          <div className="my-2 flex justify-center space-x-3">
            {paymentList.map(
              (
                pm // pm = payment method
              ) => (
                <button
                  key={pm.name}
                  onClick={() => handleSelectPaymentMethod(pm.name)}
                  className={`${selectedPaymentMethod === pm.name ? pm.style : pm.noneSelectedStyle} flex h-6 w-10 cursor-pointer items-center justify-center rounded text-xs text-white hover:opacity-80`}
                >
                  {pm.name}
                </button>
              )
            )}
          </div>
        </div>
        {/* footer */}
        <div className="rounded-xl bg-green-50 p-4 text-green-500">
          <p className="text-green-700">🔒 Thanh toán an toàn & bảo mật</p>
          <p className="text-sm">Thông tin của bạn được mã hóa SSL 256-bit</p>
        </div>
      </div>

      <CheckoutAddress
        selectedAddress={selectedAddress}
        setSelectedAddress={setSelectedAddress}
      />
    </div>
  );
};

export default CartSummary;
