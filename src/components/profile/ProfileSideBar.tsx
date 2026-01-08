'use client';

import { useCurrentUser } from '@/hook/auth/useCurrentUser';
import { DefaultAvatar } from '@/images';
import { Pencil } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const ProfileSideBar = () => {
  const { user } = useCurrentUser();
  const userSidebarItems = [
    { name: 'Hồ sơ', href: '/user/profile' },
    { name: 'Đơn hàng', href: '/user/order' },
    { name: 'Địa chỉ', href: '/user/address' },
  ];

  const pathname = usePathname();
  return (
    <>
      <section className="flex h-20 space-x-4 border-b-1 border-gray-300 py-4">
        <Image src={DefaultAvatar} alt="avatar" width={48} height={48} />
        <div className="flex flex-col space-y-1">
          <h3 className="font-semibold">{user?.name}</h3>
          <p className="flex text-sm text-gray-500">
            <Pencil width={16} height={16} />
            Sửa hồ sơ
          </p>
        </div>
      </section>
      <section className="flex flex-col space-y-4 p-4">
        {userSidebarItems.map((item) => (
          <div key={item.name}>
            <Link
              href={item.href}
              className={`${pathname === item.href ? 'text-blue-600' : 'text-gray-900'} hover:opacity-80`}
            >
              {item.name}
            </Link>
          </div>
        ))}
      </section>
    </>
  );
};

export default ProfileSideBar;
