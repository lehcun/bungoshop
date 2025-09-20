import Footer from '@/components/Footer';
import Header from '@/components/Header';
import TopBar from '@/components/TopBar';
import '../globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto flex flex-col">
      <TopBar />
      <Header />
      <main className="h-auto">{children}</main>
      <Footer />
    </div>
  );
}
