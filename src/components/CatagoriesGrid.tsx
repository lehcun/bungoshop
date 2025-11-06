'use client';

import React, { useEffect, useState } from 'react';
import * as motion from 'motion/react-client';
import Link from 'next/link';
import Container from './Container';
import { Category } from '@/models/Product';
import Image from 'next/image';

const CatagoriesGrid = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data));
  });
  return (
    <Container className="py-24 text-center">
      <div className="flex flex-col gap-y-2">
        <h2 className="text-3xl font-semibold">Danh mục thời trang</h2>
        <span className="text-lg text-gray-600">
          Tìm kiếm phong cách hoàn hảo cho bạn
        </span>
      </div>
      <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            className={`rounded-2xl bg-gradient-to-br from-blue-100 to-blue-300 px-4 py-4 hover:cursor-pointer`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href={`/shop?categories=${category.name}&sort=default`}>
              <div className="text-center">
                <div className="relative h-16 w-full">
                  {/* Chiều cao cố định, điều chỉnh theo logo */}
                  <Image
                    src={category.iconUrl}
                    alt={`Brand image ${category.name}`}
                    fill
                    loading="lazy"
                    quality={75}
                    className="object-contain"
                    sizes="100%"
                  />
                </div>
                <p className="font-semibold">{category.name}</p>
                <span>{category.products.length} sản phẩm</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </Container>
  );
};

export default CatagoriesGrid;
