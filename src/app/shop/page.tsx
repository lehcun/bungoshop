import Header from '@/components/Header';
import NavPath from '@/components/NavPath';
import ProductFilter from '@/components/product/ProductFilter';
import ShopProductsList from '@/components/product/ShopProductsList';
import TopBar from '@/components/TopBar';
import Container from '@/components/Container';
import Footer from '@/components/Footer';

export default async function ShopPage() {
  return (
    <div className="h-[2000px] bg-gray-50">
      <TopBar />
      <Header />
      <NavPath path="Sản phẩm" />
      <Container className="mt-8 flex flex-col gap-8 lg:flex-row">
        <ProductFilter />
        <ShopProductsList />
      </Container>
      <Footer />
    </div>
  );
}
