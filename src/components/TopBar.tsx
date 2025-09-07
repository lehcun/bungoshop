import { MailIcon, PhoneIcon, TruckIcon } from 'lucide-react';
import React from 'react';

const TopBar = () => {
  return (
    <div className="from-shop_light_blue to-shop_dark_blue bg-gradient-to-r py-2 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 text-sm">
        <div className="flex gap-4">
          <span className="flex gap-x-2">
            <PhoneIcon size={20} />
            Hotline: 1900-4321
          </span>
          <span className="flex gap-x-2">
            <MailIcon size={20} />
            Hotline: 1900-4321
          </span>
        </div>
        <div className="flex gap-4">
          <span className="flex gap-x-2">
            <TruckIcon size={20} />
            Miễn phí vận chuyển cho đơn từ 200k
          </span>
          {/* Sẽ thêm cả lựa chọn tiếng anh trong tương lai */}
          <span className="flex gap-x-2">
            <select className="bg-gray-900 text-white">
              <option>VN Tiếng Việt</option>
              <option>EN English</option>
            </select>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
