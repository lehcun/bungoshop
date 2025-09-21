import React from 'react';
import { HeartIcon, ShoppingCartIcon } from 'lucide-react';
import { SignedIn, UserButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';

import Search from './Search';
import SignIn from './SignIn';
import Link from 'next/link';

const UserActions = async () => {
  const user = await currentUser();

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
        <>
          <SignedIn>
            <UserButton />
          </SignedIn>
          {!user && <SignIn />}
        </>
      </div>
    </>
  );
};

export default UserActions;
