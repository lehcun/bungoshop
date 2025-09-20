import React from 'react';
import { mockApi } from '../../constants/data';
import ProductCard from './ProductCard';
import { cn } from '@/lib/utils';

const ProductGrid = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        'mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4',
        className
      )}
    >
      {mockApi.featuredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
