'use client';

import React, { useEffect, useState } from 'react';
import { HeartIcon, ShoppingCartIcon } from 'lucide-react';

import Login from './login/Login';
import Link from 'next/link';
import UserMenu from './UserMenu';
import { useAuth } from '@/contexts/AuthContext';
import { useCartContext } from '@/contexts/CartContext';

const UserActions = () => {
  const { user, logout } = useAuth();
  const { carts } = useCartContext();
  const [cartFavoriteCount, setFavoriteCount] = useState<number | undefined>(
    user?.favourites.length
  );
  const [cartItemCount, setCartItemCount] = useState<number | undefined>(
    carts.length
  );

  useEffect(() => {
    setCartItemCount(carts.length);
  }, [carts.length]);

  useEffect(() => {
    setFavoriteCount(user?.favourites.length);
  }, [user?.favourites]);

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
        {!user ? <Login /> : <UserMenu handleLogout={logout} />}
      </div>
    </>
  );
};

export default UserActions;
