'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { cn } from '@/lib/utils';
import { Product } from '@/models/Product';
import { useSearchParams } from 'next/navigation';

const ProductGrid = ({ className }: { className?: string }) => {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('categories');
  const sortParam = searchParams.get('sort');
  console.log();

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const url = `http://localhost:3001/products?${params.toString()}`;

    // console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, [searchParams, categoryParam, sortParam]);

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
