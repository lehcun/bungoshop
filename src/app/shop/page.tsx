import NavPath from '@/components/NavPath';
import ProductFilter from '@/components/product/ProductFilter';
import ShopProductsList from '@/components/product/ShopProductsList';
import Container from '@/components/Container';

export default async function ShopPage() {
  return (
    <div className="bg-gray-50">
      <NavPath path="Sản phẩm" />
      <Container className="my-8 flex flex-col gap-8 lg:flex-row">
        <ProductFilter />
        <ShopProductsList />
      </Container>
    </div>
  );
}
