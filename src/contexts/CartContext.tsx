'use client';

import { createContext, useEffect, useState } from 'react';
import { CartItem } from '@/models/Product';

export const CartContext = createContext<{
  carts: CartItem[];
  addToCart: (product: CartItem) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  removeCart: (id: string) => void;
}>({
  carts: [],
  addToCart: () => {},
  increaseQty: () => {},
  decreaseQty: () => {},
  removeCart: () => {},
}); // Mảng lưu các sản phẩm

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [carts, setCarts] = useState<CartItem[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch('http://localhost:3001/cart/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCarts(data))
      .catch((err) => console.error('Error:', err));
  }, []);
  console.log(carts);

  //Add new product to cart
  const addToCart = (product: CartItem) => {
    setCarts((prev: CartItem[]) => [...prev, { ...product, quantity: 1 }]);
  };

  //Tang san pham
  const increaseQty = (id: string) => {
    setCarts((prev: CartItem[]) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id: string) => {
    setCarts((prev: CartItem[]) => {
      return prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  };

  const removeCart = (id: string) => {
    setCarts((prev: CartItem[]) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{ carts, addToCart, increaseQty, decreaseQty, removeCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
