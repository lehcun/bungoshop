'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { cn } from '@/lib/utils';
import { Product } from '@/models/Product';
import { useSearchParams } from 'next/navigation';

const ProductGrid = ({ className }: { className?: string }) => {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('categories');

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const url = categoryParam
      ? `http://localhost:3001/products?${params.toString()}`
      : 'http://localhost:3001/products/all';

    console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, [searchParams, categoryParam]);

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
