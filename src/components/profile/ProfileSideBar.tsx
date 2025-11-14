'use client';

import { useCurrentUser } from '@/hook/auth/useCurrentUser';
import { DefaultAvatar } from '@/images';
import { Pencil } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const ProfileSideBar = () => {
  const { user } = useCurrentUser();
  return (
    <div className="w-1/6">
      <section className="flex space-x-4 border-b-1 border-gray-300 py-4">
        <Image src={DefaultAvatar} alt="avatar" width={48} height={48} />
        <div className="flex flex-col space-y-1">
          <h3 className="font-semibold">{user?.name}</h3>
          <p className="flex text-sm text-gray-500">
            <Pencil width={16} height={16} />
            Sửa hồ sơ
          </p>
        </div>
      </section>
    </div>
  );
};

export default ProfileSideBar;
