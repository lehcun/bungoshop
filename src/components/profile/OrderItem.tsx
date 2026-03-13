import React from 'react';
import Image from 'next/image';
import { formatCurrency, formatOrderDate } from '@/lib/utils';
import { Order } from '@/models/User';
import { useReOrder } from '@/hook/order/useReOrder';

const OrderItem = ({ order }: { order: Order }) => {
  const { reOrder } = useReOrder(order.id);

  const statusHandle = (status: string | null, totalPrice: number) => {
    let textCss = '';
    let bgCss = '';
    let title = '';
    if (status === 'PENDING') {
      title = 'Chờ xử lý';
      textCss = 'text-yellow-700';
      bgCss = 'bg-yellow-400';
    } else if (status === 'PAID') {
      title = 'Đã thanh toán';
      textCss = 'text-blue-700';
      bgCss = 'bg-blue-200 ';
    } else if (status === 'SHIPPED') {
      title = 'Đang giao';
      textCss = 'text-orange-700';
      bgCss = 'bg-orange-200 ';
    } else if (status === 'COMPLETED') {
      title = 'Hoàn thành';
      textCss = 'text-green-700';
      bgCss = 'bg-green-200 ';
    } else if (status === 'CANCELED') {
      title = 'Đã hủy';
      textCss = ' text-red-700';
      bgCss = 'bg-red-400';
    } else if (status === 'REFUNDED') {
      title = 'Đã hoàn tiền';
      textCss = 'text-red-700';
      bgCss = 'bg-red-400';
    } else {
    }

    return (
      <>
        <label className={`rounded-full p-1 text-center ${textCss} ${bgCss}`}>
          {title}
        </label>
        <label className={`text-xl font-semibold ${textCss}`}>
          {formatCurrency(totalPrice)}
        </label>
      </>
    );
  };

  return (
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
        <div className="flex justify-end space-x-2">
          <button className="bg-shop_btn_blue hover:bg hover:bg-shop_dark_blue rounded-sm px-10 py-2 font-medium text-white transition-colors">
            Đánh Giá
          </button>
          <button className="rounded-sm border border-gray-300 px-4 py-2 transition-colors hover:bg-gray-50">
            Yêu Cầu Trả Hàng/Hoàn Tiền
          </button>
          <button
            onClick={() => reOrder()}
            className="flex items-center rounded-sm border border-gray-300 px-4 py-2 transition-colors hover:bg-gray-50"
          >
            Mua lại
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
