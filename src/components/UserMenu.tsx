import Image from 'next/image';
import React from 'react';
import { defaultAvatar } from '@/images';
import Link from 'next/link';

const UserMenu = ({ handleLogout }: { handleLogout: () => void }) => {
  return (
    <div className="group relative my-auto cursor-pointer">
      <div className="relative mr-4 h-8 w-8 overflow-hidden rounded-full p-2">
        <Image
          src={defaultAvatar}
          alt="Default Avt user"
          layout="fill"
          objectFit="contain"
          loading="lazy"
          quality={80}
        />
      </div>
      {/* <div className="bg-shop_dark_blue invisible absolute top-8 right-1.5 h-4 w-4 rotate-45 opacity-0 shadow-xl shadow-black/10 transition-all duration-200 group-hover:visible group-hover:opacity-100"></div> */}
      <div className="border-shop_dark_blue invisible absolute top-7.5 right-1 h-0 w-0 border-r-[10px] border-b-[10px] border-l-[10px] border-r-transparent border-l-transparent opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100"></div>
      <div className="invisible absolute top-2 -left-37 h-8 w-48 bg-transparent opacity-0 group-hover:visible group-hover:opacity-100"></div>
      <ul className="bg-shop_dark_blue invisible absolute top-10 -right-4 z-2 w-48 rounded-md text-white opacity-0 shadow-xl shadow-black/10 transition-all duration-200 group-hover:visible group-hover:opacity-100 hover:rounded-md">
        <li className="py-2 hover:rounded-t-md hover:bg-gray-500">
          <Link href={'/profile'} className="px-2">
            Tài Khoản Của Tôi
          </Link>
        </li>
        <li className="py-2 hover:bg-gray-500">
          <Link href={'/user/order'} className="px-2">
            Đơn Mua
          </Link>
        </li>
        <li className="py-2 hover:rounded-b-md hover:bg-gray-500">
          <button onClick={handleLogout} className="px-2">
            Đăng Xuất
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
