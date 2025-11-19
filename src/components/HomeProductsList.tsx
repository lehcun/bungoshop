'use client';

import Container from './Container';
import ProductGrid from './ProductGrid';
import { useHotProduct } from '@/hook/products/useHotProducts';

const HomeProductsList = () => {
  const displayCount = 8;
  const { products, loading } = useHotProduct(displayCount);
  return (
    <section className="bg-gray-100">
      <Container className="py-24">
        <div className="flex flex-col gap-y-2 text-center">
          <h2 className="text-3xl font-semibold">Sản phẩm nổi bật</h2>
          <span className="text-lg text-gray-600">
            Những món đồ được yêu thích nhất
          </span>
        </div>
        <div className="">
          <ProductGrid
            products={products}
            loading={loading}
            displayCount={displayCount}
          />
        </div>
      </Container>
    </section>
  );
};

export default HomeProductsList;
