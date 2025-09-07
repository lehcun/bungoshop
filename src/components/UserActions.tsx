import { HeartIcon, ShoppingCartIcon, UserCircleIcon } from 'lucide-react';
import React from 'react';
import Search from './Search';

const UserActions = () => {
  return (
    <>
      <div className="flex gap-x-6 text-gray-600">
        <Search />
        <div className="hover:text-shop_dark_blue relative flex cursor-pointer items-center justify-center">
          <HeartIcon strokeWidth={2} />
          <div className="bg-shop_dark_blue absolute -top-0.5 left-3 flex h-5 w-5 flex-col items-center rounded-full text-white">
            10
          </div>
        </div>
        <div className="hover:text-shop_dark_blue relative flex cursor-pointer items-center">
          <ShoppingCartIcon strokeWidth={2} />
          <div className="bg-shop_dark_blue absolute -top-0.5 left-3 flex h-5 w-5 flex-col items-center rounded-full text-white">
            10
          </div>
        </div>
        <div className="hover:text-shop_dark_blue flex cursor-pointer flex-col items-center justify-center">
          <UserCircleIcon strokeWidth={2} />
        </div>
      </div>
    </>
  );
};

export default UserActions;
