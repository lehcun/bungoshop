'use client';

import Banner from '@/components/Banner';
import BrandGrid from '@/components/BrandGrid';
import CatagoriesGrid from '@/components/CatagoriesGrid';
import HomeProductsList from '@/components/HomeProductsList';
import HomeSkeleton from '@/components/skeleton/HomeSkeleton';
import { useProductContext } from '@/contexts/ProductContext';

export default function HomePage() {
  const { loading } = useProductContext();
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
