'use client';

import { useState } from 'react';
import CartItemList from '@/components/cart/CartItemList';
import { useCurrentUser } from '@/hook/auth/useCurrentUser';
import CartSummary from './CartSummary';
import LoginRequired from '../other/LoginRequired';
import LonelyCart from '../other/LonelyCart';
import Container from '../other/Container';
import { useCart } from '@/hook/cart/useCart';
import { CartItem } from '@/models/Product';

const CartModel = () => {
  const { user } = useCurrentUser();
  const { carts } = useCart(!!user);
  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);

  const toggleSelect = (itemToggle: CartItem) => {
    if (selectedItems.includes(itemToggle)) {
      setSelectedItems(selectedItems.filter((i) => i.id !== itemToggle.id));
    } else {
      setSelectedItems([...selectedItems, itemToggle]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === carts?.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(carts?.map((item: CartItem) => item));
    }
  };
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
        <CartItemList
          carts={carts}
          selectedItems={selectedItems}
          toggleSelect={toggleSelect}
          toggleSelectAll={toggleSelectAll}
        />
        <CartSummary selectedItems={selectedItems} />
      </section>
    </Container>
  );
};

export default CartModel;
