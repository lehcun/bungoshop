import Footer from '@/components/Footer';
import Header from '@/components/Header';
import '../globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto flex min-h-screen flex-col">
      <Header />
      <main className="">{children}</main>
      <Footer />
    </div>
  );
}
