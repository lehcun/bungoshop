'use client';

import { useCurrentUser } from '@/hook/auth/useCurrentUser';
import { DefaultAvatar } from '@/images';
import Image from 'next/image';
import React from 'react';

const UserInformation = () => {
  const { user } = useCurrentUser();

  const InfoRow = ({
    label,
    children,
  }: {
    label: string;
    children: React.ReactNode;
  }) => (
    <div className="mb-6 flex items-center last:mb-0">
      {/* Label: Luôn rộng 140px và căn phải */}
      <div className="w-[140px] pr-6 text-right text-sm text-gray-500">
        {label}
      </div>
      {/* Value: Phần nội dung hiển thị bên phải */}
      <div className="flex-1 text-sm text-gray-800">{children}</div>
    </div>
  );

  return (
    <div className="rounded-md bg-white px-10 py-2 shadow-sm">
      {/* Tiêu đề */}
      <section className="mb-8 border-b border-gray-100 py-5">
        <h3 className="text-lg font-medium text-gray-900">Hồ sơ của tôi</h3>
        <p className="mt-1 text-sm text-gray-500">
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </p>
      </section>

      <section className="flex flex-col md:flex-row">
        {/* CỘT TRÁI: THÔNG TIN */}
        <div className="flex-1 pb-10">
          <InfoRow label="Tên đăng nhập">{user?.username || 'NA'}</InfoRow>

          <InfoRow label="Tên">
            <input
              type="text"
              defaultValue="Cunnn"
              className="w-full max-w-[400px] border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
            />
          </InfoRow>

          <InfoRow label="Email">
            <div className="flex items-center">
              <span>{user?.email}</span>
              <button className="ml-3 text-xs text-blue-500 underline">
                {user?.email ? 'Thay đổi' : 'Thêm'}
              </button>
            </div>
          </InfoRow>

          <InfoRow label="Số điện thoại">
            <div className="flex items-center">
              <span>{user?.phone}</span>
              <button className="ml-3 text-xs text-blue-500 underline">
                {user?.phone ? 'Thay đổi' : 'Thêm'}
              </button>
            </div>
          </InfoRow>

          <InfoRow label="Giới tính">
            <div className="flex space-x-6">
              <label className="flex cursor-pointer items-center">
                <input
                  type="radio"
                  name="gender"
                  className="mr-2 h-4 w-4 accent-orange-600"
                  defaultChecked
                />
                Nam
              </label>
              <label className="flex cursor-pointer items-center">
                <input
                  type="radio"
                  name="gender"
                  className="mr-2 h-4 w-4 accent-orange-600"
                />
                Nữ
              </label>
            </div>
          </InfoRow>

          <InfoRow label="Ngày sinh">
            <div className="flex space-x-2">
              <select className="rounded-sm border p-2 text-sm">
                {[...Array(31)].map((_, i) => (
                  <option key={i}>{i + 1}</option>
                ))}
              </select>
              <select className="rounded-sm border p-2 text-sm">
                {['Tháng 1', 'Tháng 2', 'Tháng 3'].map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
              <select className="rounded-sm border p-2 text-sm">
                <option>2005</option>
              </select>
            </div>
          </InfoRow>

          {/* Nút lưu */}
          <div className="mt-10 flex">
            <div className="w-[140px]"></div>
            <button className="bg-shop_dark_blue min-w-[70px] rounded-sm px-6 py-2 text-white hover:opacity-90">
              Lưu
            </button>
          </div>
        </div>

        {/* CỘT PHẢI: AVATAR (Ngăn cách bởi đường kẻ dọc) */}
        <div className="flex w-full flex-col items-center border-l border-gray-100 pt-2 md:w-[280px]">
          <div className="relative mb-4 h-24 w-24">
            <Image
              src={DefaultAvatar}
              alt="avatar"
              className="rounded-full border border-gray-200 object-cover"
              fill
            />
          </div>
          <button className="border border-gray-300 px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50">
            Chọn ảnh
          </button>
          <div className="mt-4 text-center text-xs leading-6 text-gray-400">
            <p>Dung lượng tối đa 1 MB</p>
            <p>Định dạng: .JPEG, .PNG</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserInformation;
