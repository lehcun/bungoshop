'use client';

import React, { useEffect } from 'react';
import ProductFilter from '@/components/product/ProductFilter';
import ShopProductsList from '@/components/product/ShopProductsList';
import { useProductFilter } from '@/hook/store/useProductFilter';
import { useProductQuery } from '@/hook/products/useProductsQuery';
import { initProductFilterUrlSync } from '@/hook/store/syncProductFilterUrl';
const ProductModel = () => {
  const { categories, brands, sort, priceRange, page } = useProductFilter();
  const filters = { categories, brands, sort, priceRange };
  const { products, meta } = useProductQuery(filters, page);

  useEffect(() => {
    initProductFilterUrlSync();
  }, []);

  return (
    <>
      <ProductFilter filters={filters} />
      <ShopProductsList
        products={products}
        filters={filters}
        totalPages={meta.totalPages}
      />
    </>
  );
};

export default ProductModel;
