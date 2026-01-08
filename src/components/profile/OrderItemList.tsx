'use client';

import React from 'react';
import Image from 'next/image';
import { formatCurrency, formatOrderDate } from '@/lib/utils';
import { Order } from '@/models/User';
import { useOrderByUser } from '@/hook/order/useOrderByUser';
import { useCurrentUser } from '@/hook/auth/useCurrentUser';

const OrderItemList = () => {
  const { user } = useCurrentUser();
  const { orders, loading } = useOrderByUser();

  if (!user || loading) return <p>Loading...</p>;

  const statusHandle = (status: string | null, totalPrice: number) => {
    let textCss = '';
    let bgCss = '';
    if (status === 'PENDING') {
      textCss = ' text-yellow-700';
      bgCss = 'bg-yellow-400';
    } else if (status === 'PAID') {
    } else if (status === 'SHIPPED') {
    } else if (status === 'COMPLETED') {
      textCss = 'text-green-700';
      bgCss = 'bg-green-200 ';
    } else if (status === 'CANCELED') {
    } else if (status === 'REFUNDED') {
    } else {
    }

    return (
      <>
        <label className={`rounded-full p-1 text-center ${textCss} ${bgCss}`}>
          {status}
        </label>
        <label className={`text-xl font-semibold ${textCss}`}>
          {formatCurrency(totalPrice)}
        </label>
      </>
    );
  };
  orders.map((order: Order) => console.log(order));

  return (
    <div className="space-y-4">
      {orders.map((order: Order) => (
        <section
          key={order.id}
          className="rounded-md bg-white p-4 shadow-md shadow-black/10"
        >
          <div className="px-4">
            <div className="flex">
              <div className="flex-1">
                <h3 className="text-xl font-semibold">Đơn hàng {order.id}</h3>
                <span className="text-gray-600">
                  Đặt ngày: {formatOrderDate(order.createdAt)}
                </span>
              </div>
              <div className="flex flex-col text-right">
                {statusHandle(order.status, order.totalPrice)}
              </div>
            </div>
            <div className="space-y-3 border-b-1 border-gray-300 pb-4">
              <h4 className="font-semibold">🛍️ Sản phẩm đã mua:</h4>
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-x-2 rounded-2xl bg-gray-100 p-2"
                >
                  <div className="relative h-18 w-18 overflow-hidden rounded-2xl">
                    {/* Chiều cao cố định, điều chỉnh theo logo */}
                    <Image
                      src={item.imageUrl}
                      alt={`Product varient img`}
                      fill
                      loading="lazy"
                      quality={75}
                      className="object-contain"
                      sizes="100%"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-lg">{item.productName}</label>
                    <label className="text-gray-500">
                      Size {item.varient?.size}, {item.varient?.color} - SL:{' '}
                      {item.quantity}
                    </label>
                    <label className="text-shop_dark_blue font-semibold">
                      {formatCurrency(item.price)}
                    </label>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-x-4 py-2">
              <span className="cursor-pointer hover:opacity-70">
                🔄 Mua lại
              </span>
              <span className="cursor-pointer hover:opacity-70">
                ⭐ Đánh giá
              </span>
              <span className="cursor-pointer hover:opacity-70">
                📄 Tải hóa đơn
              </span>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default OrderItemList;
