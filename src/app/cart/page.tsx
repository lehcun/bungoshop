import Container from '@/components/Container';
import NavPath from '@/components/NavPath';
import CartItemList from '@/components/product/CartItemList';
import CartSummary from '@/components/product/CartSummary';

export default async function CartPage() {
  return (
    <div className="bg-red-500">
      <NavPath path="Giỏ hàng" />
      <Container className="mt-8">
        <span className="text-3xl font-semibold">🛒 Giỏ hàng của bạn</span>
        <section className="flex">
          <CartItemList />
          <CartSummary />
        </section>
      </Container>
    </div>
  );
}
