import { mockApi } from '../../constants/data';
import Container from './Container';
import ProductCard from './ProductCard';

const ProductsGrid = () => {
  return (
    <section className="bg-gray-100">
      <Container className="py-24">
        <div className="flex flex-col gap-y-2 text-center">
          <h2 className="text-3xl font-semibold">Sản phẩm nổi bật</h2>
          <span className="text-lg text-gray-600">
            Những món đồ được yêu thích nhất
          </span>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-x-8 md:grid-cols-2 lg:grid-cols-4">
          {mockApi.featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ProductsGrid;
