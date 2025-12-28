'use client';

import CartItemList from '@/components/product/CartItemList';
import CartSummary from './CartSummary';
import LoginRequired from '../LoginRequired';
import { useCurrentUser } from '@/hook/auth/useCurrentUser';
import LonelyCart from '../LonelyCart';
import Container from '../Container';
import { useCart } from '@/hook/cart/useCart';

const CartModel = () => {
  const { user } = useCurrentUser();
  const { carts } = useCart();
  if (!user) {
    return (
      <Container className="flex items-center justify-center py-40">
        <LoginRequired />
      </Container>
    );
  } else if (carts && carts.length === 0) {
    return (
      <Container className="flex items-center justify-center bg-gradient-to-t from-blue-50 to-blue-100 py-40">
        <LonelyCart />
      </Container>
    );
  }
  return (
    <Container className="py-8">
      <div className="mb-8 text-3xl font-semibold">🛒 Giỏ hàng của bạn</div>
      <section className="flex gap-8">
        <CartItemList />
        <CartSummary />
      </section>
    </Container>
  );
};

export default CartModel;
