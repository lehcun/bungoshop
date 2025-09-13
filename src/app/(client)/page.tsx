import Banner from '@/components/Banner';
import BrandGrid from '@/components/BrandGrid';
import CatagoriesGrid from '@/components/CatagoriesGrid';
import ProductsGrid from '@/components/ProductsGrid';

export default function Home() {
  return (
    <>
      <Banner />
      <CatagoriesGrid />
      <ProductsGrid />
      <BrandGrid />
    </>
  );
}
