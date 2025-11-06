'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { User } from '@/models/User';
import Button from '@/components/common/Button';
import { defaultAvatar } from '@/images';

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [isOpenForm, setIsOpenForm] = useState(false);

  const toggleForm = () => {
    setIsOpenForm(!isOpenForm);
  };

  useEffect(() => {
    fetch('http://localhost:3001/users')
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, [users]);

  const addNewUser = async (name: string) => {
    try {
      const res = await fetch('http://localhost:3001/users', {
        method: 'POST',
        body: JSON.stringify({
          name,
          //Them
        }),
      });
      if (!res.ok) throw new Error('Thêm giỏ hành thất bại');
      const data = res.json();
      // setUsers(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col space-y-8 p-4">
      <header className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">Quản Lý Người Dùng</h1>
          <p className="text-gray-500">
            Quản lý thông tin và quyền hạn người dùng
          </p>
        </div>
        <div>
          <Button iconLeft="➕" className="rounded-xl" onClick={toggleForm}>
            Thêm người dùng
          </Button>
        </div>
      </header>
      <section className="grid justify-between gap-4 rounded-2xl bg-white px-6 py-4 md:grid-cols-4">
        <div className="flex flex-col gap-y-1">
          <label className="text-gray-500">Tìm kiếm</label>
          <input
            type="text"
            placeholder="Tên, Email"
            className="rounded-lg border-1 border-gray-200 p-2"
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <label className="text-gray-500">Vai trò</label>
          <select className="rounded-lg border-1 border-gray-200 p-2">
            <option>Tất cả</option>
            <option>Quản trị viên</option>
            <option>Khách hàng</option>
          </select>
        </div>
        <div className="flex flex-col gap-y-1">
          <label className="text-gray-500">Trạng thái</label>
          <select className="rounded-lg border-1 border-gray-200 p-2">
            <option>Tất cả</option>
            <option>Hoạt động</option>
            <option>Tạm khóa</option>
            <option>Đã xóa</option>
          </select>
        </div>
        <div className="flex items-end">
          <Button variant="ghost" className="h-10 w-full border-1 bg-gray-50">
            Tìm kiếm
          </Button>
        </div>
      </section>
      <section className="justify-between overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-md px-6 py-4 text-left font-medium text-gray-500">
                  Người dùng
                </th>
                <th className="text-md px-6 py-4 text-left font-medium text-gray-500">
                  Vai trò
                </th>
                <th className="text-md px-6 py-4 text-left font-medium text-gray-500">
                  Trạng thái
                </th>
                <th className="text-md px-6 py-4 text-left font-medium text-gray-500">
                  Ngày tham gia
                </th>
                <th className="text-md px-6 py-4 text-left font-medium text-gray-500">
                  Đơn hàng
                </th>
                <th className="text-md px-6 py-4 text-left font-medium text-gray-500">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* Users row */}
              {users.map((user) => (
                <tr key={user.id} className="table-row">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="relative h-10 w-10 items-center justify-center overflow-hidden rounded-full">
                        <Image
                          src={user.avatarUrl && defaultAvatar}
                          alt={`Brand image ${user.name}`}
                          layout="fill"
                          objectFit="contain"
                          loading="lazy"
                          quality={75}
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-800">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-green-800">
                      Hoạt động
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full px-3 py-1">
                      {user.createdAt.substring(0, 10)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full px-3 py-1">
                      {user.orders.length > 0
                        ? `${user.orders.length} Đơn`
                        : '-'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 transition hover:text-blue-800">
                        ✏️
                      </button>
                      <button className="text-red-600 transition hover:text-red-800">
                        🗑️
                      </button>
                      <button className="text-gray-600 transition hover:text-gray-800">
                        👁️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Hiển thị 1-10 trong tổng số 156 người dùng
              </div>
              <div className="flex items-center space-x-2">
                <button className="rounded border border-gray-300 px-3 py-1 hover:bg-gray-50">
                  ‹
                </button>
                <button className="rounded bg-blue-500 px-3 py-1 text-white">
                  1
                </button>
                <button className="rounded border border-gray-300 px-3 py-1 hover:bg-gray-50">
                  2
                </button>
                <button className="rounded border border-gray-300 px-3 py-1 hover:bg-gray-50">
                  3
                </button>
                <button className="rounded border border-gray-300 px-3 py-1 hover:bg-gray-50">
                  ›
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* add user form */}
      <div
        className={`${isOpenForm ? 'flex' : 'hidden'} fixed inset-0 z-10 items-center justify-center backdrop-blur-sm`}
      >
        <div className="w-full max-w-md rounded-2xl bg-white p-6">
          <h2 className="mb-4 text-xl font-semibold">Thêm Người Dùng Mới</h2>
          <div className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-1">
              <label>Họ và tên</label>
              <input
                type="text"
                className="rounded-lg border-1 border-gray-100 p-2"
              />
            </div>
            <div className="flex flex-col gap-y-1">
              <label>Email</label>
              <input
                type="text"
                className="rounded-lg border-1 border-gray-100 p-2"
              />
            </div>
            <div className="flex flex-col gap-y-1">
              <label>Số điện thoại</label>
              <input
                type="text"
                className="rounded-lg border-1 border-gray-100 p-2"
              />
            </div>
            <div className="flex flex-col gap-y-1">
              <label>Vai trò</label>
              <select className="rounded-lg border-1 border-gray-200 p-2">
                <option>Chọn vai trò</option>
                <option>Quản trị viên</option>
                <option>Khách hàng</option>
              </select>
            </div>
            <div className="flex flex-col gap-y-1">
              <label>Mật khẩu</label>
              <input
                type="text"
                className="rounded-lg border-1 border-gray-100 p-2"
              />
            </div>
            <div className="flex gap-x-2">
              <Button
                className="w-full rounded-xl"
                onClick={toggleForm}
                variant="outline"
              >
                Hủy
              </Button>
              <Button className="w-full rounded-xl">Thêm người dùng</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
