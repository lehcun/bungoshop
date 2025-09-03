import React from 'react';
import { navbarList } from '../../constants/data';
import Link from 'next/link';
import { MenuIcon, StarIcon } from 'lucide-react';

const NavBar = () => {
  return (
    <div className="bg-shop_dark_blue top-0 text-white">
      <div className="mx-auto flex max-w-7xl items-center">
        <button className="bg-shop-test hover:bg-shop-test/70 mx-3 my-2 flex cursor-pointer items-center gap-x-1 rounded-lg p-2">
          <MenuIcon size={20} />
          Danh Mục
        </button>
        <div className="mx-2 flex flex-1 justify-between">
          <div className="flex gap-x-5">
            {navbarList.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="cursor-pointer hover:text-white/80"
              >
                {item.title}
              </Link>
            ))}
          </div>
          <div className="right-0 flex gap-x-1 text-amber-400">
            <StarIcon />
            Hoàn tiền 100% với hàng lỗi
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
