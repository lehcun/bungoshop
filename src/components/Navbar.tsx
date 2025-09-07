import React from 'react';
import { navbarList } from '../../constants/data';
import Link from 'next/link';

const NavBar = () => {
  return (
    <nav className="hidden justify-between text-gray-600 lg:flex">
      <div className="flex gap-x-5">
        {navbarList.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="hover:text-shop_dark_blue cursor-pointer"
          >
            {item.title}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
