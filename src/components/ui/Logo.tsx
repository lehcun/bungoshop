import Link from 'next/link';
import React from 'react';

const Logo = () => {
  return (
    <div>
      <Link
        href={'/'}
        className="text-shop_light_blue hover:text-shop_dark_blue hoverEffect group flex cursor-pointer flex-row text-3xl font-semibold"
      >
        BUNGO
        <div className="text-shop_dark_blue group-hover:text-shop_light_blue">
          SHOP
        </div>
      </Link>
    </div>
  );
};

export default Logo;
