import Header from '@/components/Header';
import TopBar from '@/components/TopBar';
import Footer from '@/components/Footer';
import Container from '@/components/Container';
import NavPath from '@/components/NavPath';

export default async function CartPage() {
  return (
    <div className="bg-gray-50">
      <TopBar />
      <Header />
      <NavPath path="Giỏ hàng" />
      <Container className="mt-8">Hello</Container>
      <Footer />
    </div>
  );
}
