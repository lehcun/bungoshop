import React from 'react';

const TopBar = () => {
  return (
    <div className="from-shop_light_blue to-shop_dark_blue bg-gradient-to-r py-2 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-center px-4 text-sm">
        <div className="text-md flex gap-4">
          <span className="flex gap-x-2">✨ SALE 50% toàn bộ BST Thu Đông</span>
          <span>|</span>
          <span className="flex gap-x-2">🚚 Miễn phí ship đơn từ 299k</span>
          <span>|</span>
          <span className="flex gap-x-2">💎 Đổi trả trong 30 ngày</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
