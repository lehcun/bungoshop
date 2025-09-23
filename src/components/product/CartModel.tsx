'use client';

import CartItemList from '@/components/product/CartItemList';
import CartSummary from '@/components/product/CartSummary';
import { CartProvider } from '@/contexts/CartContext';

const CartModel = () => {
  return (
    <>
      <CartProvider>
        <CartItemList />
        <CartSummary />
      </CartProvider>
    </>
  );
};

export default CartModel;
