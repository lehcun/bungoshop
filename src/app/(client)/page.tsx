'use client';

import BrandGrid from '@/components/BrandGrid';
import Banner from '@/components/homepage/Banner';
import CatagoriesGrid from '@/components/homepage/CatagoriesGrid';
import HomeProductsList from '@/components/homepage/HomeProductsList';
import HomeSkeleton from '@/components/skeleton/HomeSkeleton';
import { useProduct } from '@/hook/products/useProduct';

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
