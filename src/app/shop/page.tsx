import NavPath from '@/components/NavPath';
import ProductFilter from '@/components/product/ProductFilter';
import ShopProductsList from '@/components/product/ShopProductsList';
import Container from '@/components/Container';

export default async function ShopPage() {
  return (
    <div className="h-[2000px] bg-gray-50">
      <NavPath path="Sản phẩm" />
      <Container className="mt-8 flex flex-col gap-8 lg:flex-row">
        <ProductFilter />
        <ShopProductsList />
      </Container>
    </div>
  );
}
