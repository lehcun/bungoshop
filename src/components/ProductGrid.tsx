'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { cn } from '@/lib/utils';
import { Product } from '@/models/Product';

const ProductGrid = ({ className }: { className?: string }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

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
