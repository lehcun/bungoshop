import Banner from '@/components/Banner';
import CatagoriesGrid from '@/components/CatagoriesGrid';
import ProductsGrid from '@/components/ProductsGrid';

export default function Home() {
  return (
    <div className="">
      <Banner />
      <CatagoriesGrid />
      <ProductsGrid />
    </div>
  );
}
