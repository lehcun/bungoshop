import React from 'react';
import { mockApi } from '../../constants/data';
import * as motion from 'motion/react-client';
import Link from 'next/link';

const CatagoriesGrid = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="my-12 flex flex-col items-center">
        <h2 className="text-2xl font-semibold">Danh mục thời trang</h2>
        <span className="text-lg">Tìm kiếm phong cách hoàn hảo cho bạn</span>
      </div>
      <div className="flex space-x-12">
        {mockApi.categories.map((item) => (
          <motion.div
            key={item.id}
            className={`hover: cursor-pointer rounded-2xl px-4 py-2 ${item.bgColor} ${item.hoverBgColor}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href={'/'}>
              <div className="flex flex-col items-center">
                <span className="my-4 text-4xl">{item.icon}</span>
                <span>{item.name}</span>
                <span>{item.count} sản phẩm</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CatagoriesGrid;
