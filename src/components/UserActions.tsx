import { HeartIcon, ShoppingCartIcon, UserCircleIcon } from 'lucide-react';
import React from 'react';

const UserActions = () => {
  return (
    <div className="flex gap-x-4 text-sm text-gray-500">
      <div className="hover:text-shop_light_blue relative flex cursor-pointer flex-col items-center">
        <HeartIcon />
        Yêu thích
        <div className="bg-shop_dark_blue absolute -top-2 right-2 flex h-5 w-5 flex-col items-center rounded-full text-white">
          10
        </div>
      </div>
      <div className="hover:text-shop_light_blue relative flex cursor-pointer flex-col items-center">
        <ShoppingCartIcon />
        Giỏ hàng
        <div className="bg-shop_dark_blue absolute -top-2 right-2 flex h-5 w-5 flex-col items-center rounded-full text-white">
          10
        </div>
      </div>
      <div className="hover:text-shop_light_blue flex cursor-pointer flex-col items-center">
        <UserCircleIcon />
        Tài khoản
      </div>
    </div>
  );
};

export default UserActions;
