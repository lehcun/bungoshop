'use client';

import React, { useEffect, useState } from 'react';
import Container from './Container';
import { Brand } from '@/models/Brand';
import Image from 'next/image';
import Link from 'next/link';

const BrandGrid = () => {
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/brands')
      .then((res) => res.json())
      .then((data) => setBrands(data));
  });
  return (
    <Container className="py-24">
      <div className="flex flex-col gap-y-2 text-center">
        <h2 className="text-3xl font-semibold">Thương hiệu đối tác</h2>
        <span className="text-lg text-gray-600">
          Hợp tác cùng những thương hiệu hàng đầu
        </span>
      </div>
      <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="cursor-pointer py-8 text-center hover:bg-gray-100"
          >
            <Link href={`/shop?brands =${brand.name}&sort=default`}>
              <div className="relative h-24 w-full">
                {/* Chiều cao cố định, điều chỉnh theo logo */}
                <Image
                  src={brand.logoUrl}
                  alt={`Brand image ${brand.name}`}
                  layout="fill" // Điền đầy container
                  objectFit="contain" // Giữ tỷ lệ gốc, không bóp méo
                  loading="lazy"
                  quality={75}
                />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default BrandGrid;
