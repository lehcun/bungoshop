import Container from './Container';
import ProductGrid from './ProductGrid';
import { ProductListProvider } from '@/contexts/ProductListContext';

const HomeProductsList = () => {
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
          <ProductListProvider displayCount={8}>
            <ProductGrid />
          </ProductListProvider>
        </div>
      </Container>
    </section>
  );
};

export default HomeProductsList;
