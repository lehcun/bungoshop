'use client';

import CartItemList from '@/components/product/CartItemList';
import CartSummary from './CartSummary';
import { useAuth } from '@/contexts/AuthContext';
import LoginRequired from '../LoginRequired';

const CartModel = () => {
  const { user } = useAuth();
  if (!user) {
    return (
      <div className="mx-auto w-120">
        <LoginRequired />
      </div>
    );
  }
  return (
    <>
      <div className="my-8 text-3xl font-semibold">🛒 Giỏ hàng của bạn</div>
      <section className="flex gap-8">
        <CartItemList />
        <CartSummary />
      </section>
    </>
  );
};

export default CartModel;
