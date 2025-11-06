'use client';

import React from 'react';
import ProductCard from './ProductCard';
import { cn } from '@/lib/utils';
import { useProductListContext } from '@/contexts/ProductListContext';
import { SkeletonTheme } from 'react-loading-skeleton';
import { ProductSkeleton } from './skeleton/ProductSkeleton';

const ProductGrid = ({ className }: { className?: string }) => {
  const { products, loading } = useProductListContext();

  return (
    <SkeletonTheme baseColor="#f3f4f6" highlightColor="#e5e7eb">
      <div
        className={cn(
          'mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4',
          className
        )}
      >
        {loading
          ? Array(12)
              .fill(null)
              .map((_, i) => <ProductSkeleton key={i} />)
          : products.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </SkeletonTheme>
  );
};

export default ProductGrid;
