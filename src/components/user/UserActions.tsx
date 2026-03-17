'use client';

import React from 'react';
import { HeartIcon, ShoppingCartIcon } from 'lucide-react';

import Login from '../auth/Login';
import Link from 'next/link';
import UserMenu from './UserMenu';
import { useFavourite } from '@/hook/favourite/UseFavourite';
import { useCurrentUser } from '@/hook/auth/useCurrentUser';
import { useLogout } from '@/hook/auth/useLogout';
import { useCart } from '@/hook/cart/useCart';

const UserActions = () => {
  const { user } = useCurrentUser();
  const { logout } = useLogout();
  const { carts } = useCart(!!user);
  const { favourites } = useFavourite(!!user);

  const cartItemCount = carts?.length || 0;
  const cartFavoriteCount = favourites?.length || 0;

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <div className="flex gap-x-6 text-gray-600">
        <Link
          href={'/favourite'}
          className="hover:text-shop_dark_blue relative flex cursor-pointer items-center justify-center"
        >
          <HeartIcon strokeWidth={2} />
          <div className="bg-shop_dark_blue absolute -top-0.5 left-3 flex h-5 w-5 flex-col items-center rounded-full text-white">
            {cartFavoriteCount || 0}
          </div>
        </Link>
        <Link
          href={'/cart'}
          className="hover:text-shop_dark_blue relative flex cursor-pointer items-center"
        >
          <ShoppingCartIcon strokeWidth={2} />
          <div className="bg-shop_dark_blue absolute -top-0.5 left-3 flex h-5 w-5 flex-col items-center rounded-full text-white">
            {cartItemCount || 0}
          </div>
        </Link>
        {!user ? <Login /> : <UserMenu handleLogout={handleLogout} />}
      </div>
    </>
  );
};

export default UserActions;
