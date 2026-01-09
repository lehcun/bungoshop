import TopBar from '@/components/layout/TopBar';
import '../globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto flex flex-col">
      <TopBar />
      <Header />
      <main className="min-h-120">{children}</main>
      <Footer />
    </div>
  );
}
