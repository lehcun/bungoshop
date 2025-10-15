'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { cn } from '@/lib/utils';
import { Product } from '@/models/Product';
import { useSearchParams } from 'next/navigation';

const ProductGrid = ({
  className,
  displayCount,
}: {
  className?: string;
  displayCount?: number;
}) => {
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const url = displayCount
      ? `http://localhost:3001/products/display/${displayCount}`
      : `http://localhost:3001/products?${params.toString()}`;

    // console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, [searchParams, displayCount]);

  return (
    <div
      className={cn(
        'mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4',
        className
      )}
    >
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
};

export default ProductGrid;
