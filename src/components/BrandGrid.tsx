import React from 'react';
import { brandList } from '../constants/data';
import Container from './Container';

const BrandGrid = () => {
  return (
    <Container className="py-24">
      <div className="flex flex-col gap-y-2 text-center">
        <h2 className="text-3xl font-semibold">Thương hiệu đối tác</h2>
        <span className="text-lg text-gray-600">
          Hợp tác cùng những thương hiệu hàng đầu
        </span>
      </div>
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
        {brandList.map((brand, index) => (
          <div
            key={index}
            className="cursor-pointer py-8 text-center hover:bg-gray-100"
          >
            <div className="mb-3 text-5xl">{brand.logo}</div>
            <h2 className="font-semibold text-gray-600">{brand.title}</h2>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default BrandGrid;
