import NavPath from '@/components/ui/NavPath';

import Container from '@/components/Container';
import ProductModel from '@/components/product/ProductModel';

export default async function ShopPage() {
  return (
    <div className="bg-gray-50">
      <NavPath path="Sản phẩm" />
      <Container className="flex flex-col gap-8 py-8 lg:flex-row">
        <ProductModel />
      </Container>
    </div>
  );
}
