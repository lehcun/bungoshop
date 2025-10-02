'use client';

import { useAuth } from '@/contexts/AuthContext';
import { DefaultAvatar } from '@/images';
import Image from 'next/image';
import React from 'react';

const UserInformation = () => {
  const { user } = useAuth();
  return (
    <div className="w-5/6 bg-white px-8 shadow-sm">
      <section className="border-b-1 border-gray-300 py-4">
        <h3 className="text-xl font-semibold">Hồ sơ của tôi</h3>
        <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
      </section>
      <section className="flex w-auto space-x-8 py-8">
        <div className="w-2/10 text-right">
          <ul className="flex flex-col space-y-8 text-gray-500">
            <li>Tên đăng nhập</li>
            <li>Tên</li>
            <li>Email</li>
            <li>Số điện thoại</li>
            <li>Giới tính</li>
            <li>Ngày sinh</li>
          </ul>
        </div>
        <div className="w-5/10">
          <ul className="flex flex-col space-y-8">
            <li>{user?.username}</li>
            <li>Cunnn</li>
            <li>
              {user?.email}
              <span className="text-shop_dark_blue underline">Thêm</span>
            </li>
            <li>{user?.sdt}</li>
            <li>Nam</li>
            <li>29/07/2005</li>
          </ul>
        </div>
        <div className="w-3/10 border-l-1 border-gray-300 px-8">
          <div className="flex flex-col items-center space-y-4">
            <Image src={DefaultAvatar} alt="avatar" width={96} height={96} />
            <button className="border-1 border-gray-300 px-4 py-2 text-gray-500 hover:bg-gray-100">
              Chọn ảnh
            </button>
            <div className="text-sm text-gray-400">
              <p>Dung lượng tối đa 1MB</p>
              <p>Định dạng: .PNG</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserInformation;
