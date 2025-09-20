import Banner from '@/components/Banner';
import BrandGrid from '@/components/BrandGrid';
import CatagoriesGrid from '@/components/CatagoriesGrid';
import HomeProductsList from '@/components/HomeProductsList';

export default function Home() {
  return (
    <>
      <Banner />
      <CatagoriesGrid />
      <HomeProductsList />
      <BrandGrid />
    </>
  );
}
