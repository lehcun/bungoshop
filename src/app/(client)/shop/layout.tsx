import Header from '@/components/Header';
import TopBar from '@/components/TopBar';
import Footer from '@/components/Footer';

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex flex-col">
      <TopBar />
      <Header />
      <main className="h-auto">{children}</main>
      <Footer />
    </div>
  );
}
