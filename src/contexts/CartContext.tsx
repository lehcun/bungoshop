'use client';

import { createContext, useState } from 'react';
import { mockApi } from '../../constants/data';

interface PropType {
  id: string | number;
  bgColor: string | null;
  icon: React.ReactNode;
  discount?: string | null;
  badges: string[];
  name: string;
  description: string;
  reviews_count: number;
  price: number;
  original_price?: number | null;
  variants: string[];
  quantity: number;
}

export const CartContext = createContext<{
  cart: PropType[];
  addToCart: (product: PropType) => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
  removeCart: (id: number) => void;
}>({
  cart: [],
  addToCart: () => {},
  increaseQty: () => {},
  decreaseQty: () => {},
  removeCart: () => {},
}); // Mảng lưu các sản phẩm

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<PropType[]>(mockApi.featuredProducts);

  //Add new product to cart
  const addToCart = (product: PropType) => {
    setCart((prev: PropType[]) => [...prev, { ...product, quantity: 1 }]);
  };

  //Tang san pham
  const increaseQty = (id: string | number) => {
    setCart((prev: PropType[]) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id: string | number) => {
    setCart((prev: PropType[]) => {
      return prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  };

  const removeCart = (id: string | number) => {
    setCart((prev: PropType[]) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, increaseQty, decreaseQty, removeCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
