'use client';

import React from 'react';
import ProductCard from './ProductCard';
import { cn } from '@/lib/utils';
import { useProductListContext } from '@/contexts/ProductListContext';

const ProductGrid = ({ className }: { className?: string }) => {
  const { products } = useProductListContext();

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
