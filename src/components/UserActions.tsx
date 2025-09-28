import React from 'react';
import { HeartIcon, ShoppingCartIcon } from 'lucide-react';

import Search from './Search';
import Login from './login/Login';
import Link from 'next/link';
import UserMenu from './UserMenu';

const UserActions = async () => {
  const user = true; // = user da dang nhap

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
        <Link
          href={'/cart'}
          className="hover:text-shop_dark_blue relative flex cursor-pointer items-center"
        >
          <ShoppingCartIcon strokeWidth={2} />
          <div className="bg-shop_dark_blue absolute -top-0.5 left-3 flex h-5 w-5 flex-col items-center rounded-full text-white">
            10
          </div>
        </Link>
        {!user ? <Login /> : <UserMenu />}
      </div>
    </>
  );
};

export default UserActions;
