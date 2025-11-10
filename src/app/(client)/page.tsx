'use client';

import Banner from '@/components/Banner';
import BrandGrid from '@/components/BrandGrid';
import CatagoriesGrid from '@/components/CatagoriesGrid';
import HomeProductsList from '@/components/HomeProductsList';
import HomeSkeleton from '@/components/skeleton/HomeSkeleton';
import { useProduct } from '@/hook/useProduct';

export default function HomePage() {
  const { loading } = useProduct();
  if (loading) return <HomeSkeleton />;
  return (
    <>
      <Banner />
      <CatagoriesGrid />
      <HomeProductsList />
      <BrandGrid />
    </>
  );
}
