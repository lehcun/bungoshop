import Container from '@/components/Container';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import NavPath from '@/components/NavPath';
import ProductDisplay from '@/components/product/ProductDisplay';

export default async function ProductDetailPage() {
  return (
    <>
      <Header />
      <NavPath path="productDetail" />
      <div className="h-auto bg-gray-100">
        <Container className="flex gap-8 py-8">
          <ProductDisplay />
        </Container>
      </div>
      <Footer />
    </>
  );
}
