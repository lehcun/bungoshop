'use client';

import React from 'react';
import Image from 'next/image';
import { useCurrentUser } from '@/hook/auth/useCurrentUser';
import { defaultAvatar } from '@/images';
import { formatCurrency, formatOrderDate } from '@/lib/utils';
import { Order } from '@/models/User';
import { useOrderByUser } from '@/hook/order/useOrderByUser';

const OrderDetail = () => {
  const { user } = useCurrentUser();
  const { orders, loading } = useOrderByUser();
  if (!user || loading) return <p>Loading...</p>;

  const statusHandle = (status: string | null) => {
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
        <label className={`text-xl font-semibold ${textCss}`}>1.250.000₫</label>
      </>
    );
  };

  const filterOptions = [
    {
      icon: '📦',
      name: 'Tất cả',
      count: '47',
    },
    {
      icon: '⏳',
      name: 'Chờ xử lý',
      count: '3',
    },
    {
      icon: '🚚',
      name: 'Đang giao',
      count: '8',
    },
    {
      icon: '✅',
      name: 'Hoàn thành',
      count: '34',
    },
    {
      icon: '❌',
      name: 'Đã hủy',
      count: '2',
    },
  ];

  return (
    <>
      {/* Thong tin nguoi dung */}
      <section className="flex space-x-4 rounded-2xl bg-white p-4 shadow-md shadow-black/10">
        <div className={`relative h-18 w-18 overflow-hidden rounded-full`}>
          <Image
            src={user?.avatarUrl && defaultAvatar}
            alt={`Order Img`}
            layout="fill"
            objectFit="contain"
            loading="lazy"
            quality={75}
          />
        </div>
        <div className="flex flex-1 flex-col">
          <h3>{user.name}</h3>
          <span>📧 {user.email}</span>
          <span>📱 {user.phone ? user.phone : 'Chưa thêm'}</span>
        </div>
        <div className="flex space-x-4 text-center">
          <div>
            <div className="text-shop_dark_blue text-2xl font-semibold">
              {user.orders.length}
            </div>
            <span className="text-md text-gray-600">Tổng đơn</span>
          </div>
          <div>
            <div className="text-2xl font-semibold text-green-600">12.5M</div>
            <span className="text-md text-gray-600">Tổng chi</span>
          </div>
          <div>
            <div className="text-2xl font-semibold text-violet-600">2.5K</div>
            <span className="text-md text-gray-600">Điểm tích lũy</span>
          </div>
        </div>
      </section>
      {/* Tim kiem & Loc */}
      <section className="flex space-x-4 rounded-2xl bg-white p-4 shadow-md shadow-black/10">
        <div className="flex flex-1 flex-wrap gap-2">
          {filterOptions.map((item) => (
            <div
              key={item.name}
              className="flex cursor-pointer space-x-1 rounded-lg bg-gray-200 p-2 hover:bg-gray-100"
            >
              <div>{item.icon}</div>
              <div>
                {item.name}({item.count})
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-3">
          <input
            type="text"
            placeholder="🔍 Tìm kiếm đơn hàng..."
            className="w-64 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
          <select className="rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500">
            <option>📅 Tất cả thời gian</option>
            <option>📅 30 ngày qua</option>
            <option>📅 3 tháng qua</option>
            <option>📅 6 tháng qua</option>
            <option>📅 1 năm qua</option>
          </select>
        </div>
      </section>
      <div className="space-y-4">
        {orders.map((order: Order) => (
          <section
            key={order.id}
            className="rounded-2xl bg-white p-4 shadow-md shadow-black/10"
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
                  {statusHandle(order.status)}
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
                        src={defaultAvatar}
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
      <section>chuyen traang</section>
    </>
  );
};

export default OrderDetail;
