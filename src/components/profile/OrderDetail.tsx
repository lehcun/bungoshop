'use client';

import { useAuth } from '@/contexts/AuthContext';
import { defaultAvatar } from '@/images';
import Image from 'next/image';
import React from 'react';

const OrderDetail = () => {
  const { user } = useAuth();
  console.log(user);
  //Xu ly loading sau
  if (!user) return <></>;

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
      <div>
        <section className="rounded-2xl bg-white p-4 shadow-md shadow-black/10">
          <div className="px-4">
            <div className="flex">
              <div className="flex-1">
                <h3 className="text-xl font-semibold">Đơn hàng #DH001</h3>
                <span className="text-gray-600">
                  Đặt ngày: 15/03/2024 - 14:30
                </span>
              </div>
              <div className="flex flex-col text-right">
                <label className="rounded-full bg-green-200 p-1 text-green-800">
                  ✅ Hoàn thành
                </label>
                <label className="text-xl font-semibold text-green-600">
                  1.250.000₫
                </label>
              </div>
            </div>
            <div className="border-b-1 border-gray-300 pb-4">
              <h4 className="font-semibold">🛍️ Sản phẩm đã mua:</h4>
              <div className="flex flex-col gap-1 rounded-2xl bg-gray-100 p-2">
                <label className="text-lg">Váy Maxi Hoa Nhí </label>
                <label className="text-gray-500">Size M, Màu đỏ - SL: 1</label>
                <label className="text-shop_dark_blue font-semibold">
                  490.000₫
                </label>
              </div>
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
      </div>
      <section>chuyen traang</section>
    </>
  );
};

export default OrderDetail;
