import Container from '@/components/Container';
import NavPath from '@/components/NavPath';
import CartModel from '@/components/product/CartModel';

export default async function CartPage() {
  return (
    <div className="bg-gray-50">
      <NavPath path="Giỏ hàng" />
      <Container className="pb-8">
        <div className="my-8 text-3xl font-semibold">🛒 Giỏ hàng của bạn</div>
        <section className="flex gap-8">
          <CartModel />
        </section>
      </Container>
    </div>
  );
}
