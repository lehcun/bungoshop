'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, Product, Variant } from '@/models/Product';

export const CartContext = createContext<{
  carts: CartItem[];
  addToCart: (product: Product, varient: Variant, quantity: number) => void;
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
  const addToCart = async (
    product: Product,
    variant: Variant,
    quantity: number
  ) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:3001/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product.id,
          variantId: variant.id,
          quantity,
        }),
      });
      if (!res.ok) throw new Error('Thêm giỏ hành thất bại');
      const data = await res.json();
      console.log(data);

      setCarts((prev: CartItem[]) => {
        const existing = prev.find((item) => item.variantId === data.variantId);
        if (existing) {
          return prev.map((item) =>
            item.variantId === data.variantId ? data : item
          );
        }
        return [...prev, data];
      });
    } catch (err) {
      console.log(err);
      console.log(product.id, variant.id, quantity);
    }
  };

  //Tang san pham
  const increaseQty = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('token not found');

      const currentItem = carts.find((item) => item.id === id);
      if (!currentItem)
        throw new Error('Khong tim thay san pham ban muon tang quantity');

      const res = await fetch(`http://localhost:3001/cart/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id,
          quantity: currentItem.quantity + 1,
        }),
      });
      if (!res.ok) throw new Error('Tang san pham trong giỏ hành thất bại');
    } catch (err) {
      console.log(err);
    }

    setCarts((prev: CartItem[]) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('token not found');

      const currentItem = carts.find((item) => item.id === id);
      if (!currentItem)
        throw new Error('Khong tim thay san pham ban muon tang quantity');

      const res = await fetch(`http://localhost:3001/cart/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id,
          quantity: currentItem.quantity - 1,
        }),
      });
      if (!res.ok) throw new Error('Tang san pham trong giỏ hành thất bại');
    } catch (err) {
      console.log(err);
    }

    setCarts((prev: CartItem[]) => {
      return prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  };

  const removeCart = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('token not found');

      const res = await fetch(`http://localhost:3001/cart/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Xoa san pham that bai');
    } catch (err) {
      console.error('❌ Lỗi khi xóa giỏ hàng:', err);
    }
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

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error('useProductContext must be used inside ProductProvider');
  return context;
};
