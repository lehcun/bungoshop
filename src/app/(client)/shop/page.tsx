import NavPath from '@/components/NavPath';
import ProductFilter from '@/components/product/ProductFilter';
import ShopProductsList from '@/components/product/ShopProductsList';
import Container from '@/components/Container';
import { ProductListProvider } from '@/contexts/ProductListContext';

export default async function ShopPage() {
  return (
    <div className="bg-gray-50">
      <NavPath path="Sản phẩm" />
      <ProductListProvider>
        <Container className="flex flex-col gap-8 py-8 lg:flex-row">
          <ProductFilter />
          <ShopProductsList />
        </Container>
      </ProductListProvider>
    </div>
  );
}
