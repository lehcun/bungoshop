import React from 'react';
import { mockApi } from '../../constants/data';
import * as motion from 'motion/react-client';
import Link from 'next/link';
import Container from './Container';

const CatagoriesGrid = () => {
  return (
    <Container className="py-24 text-center">
      <div className="flex flex-col gap-y-2">
        <h2 className="text-3xl font-semibold">Danh mục thời trang</h2>
        <span className="text-lg text-gray-600">
          Tìm kiếm phong cách hoàn hảo cho bạn
        </span>
      </div>
      <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
        {mockApi.categories.map((item) => (
          <motion.div
            key={item.id}
            className={`rounded-2xl px-4 py-4 hover:cursor-pointer ${item.bgColor} ${item.hoverBgColor}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href={'/shop'}>
              <div className="text-center">
                <h3 className="my-4 text-5xl">{item.icon}</h3>
                <p className="font-semibold">{item.name}</p>
                <span>{item.count} sản phẩm</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </Container>
  );
};

export default CatagoriesGrid;
