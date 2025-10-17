'use client';

import React, { useContext } from 'react';

import { CartContext } from '@/contexts/CartContext';
import { formatCurrency } from '@/lib/utils';
import { CartItem } from '@/models/Product';

const CartItemDetail = ({ item }: { item: CartItem }) => {
  const { increaseQty, decreaseQty, removeCart } = useContext(CartContext);
  const decrease = (id: string) => {
    if (item.quantity === 1) {
      removeCart(id);
    } else {
      decreaseQty(id);
    }
  };

  return (
    <>
      <div className="flex">
        <div className={`mr-4 rounded-2xl p-8 text-3xl`}>
          {/* {item.product.images[0].url} */}
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold">{item.product.name}</h3>
            <div className="text-gray-500">
              Size: {item.variant?.size} | {item.variant?.color}
            </div>
          </div>
          <div className="flex gap-x-2">
            <span className="text-shop_dark_blue text-xl font-bold">
              {formatCurrency(
                item.unitPrice
                  ? (item.unitPrice *
                      item.quantity *
                      (100 - item.product.discount)) /
                      100
                  : 0
              )}
            </span>
            {item.product.discount > 0 && (
              <span className="text-gray-500 line-through">
                {formatCurrency(
                  item.variant?.priceDelta
                    ? item.variant?.priceDelta * item.quantity
                    : item.product.price * item.quantity
                )}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center rounded-xl border-2 border-gray-400">
          <button
            className="cursor-pointer px-4 py-2 hover:bg-gray-300"
            onClick={() => decrease(item.id)}
          >
            -
          </button>
          <span className="px-4 py-2">{item.quantity}</span>
          <button
            className="cursor-pointer px-4 py-2 hover:bg-gray-300"
            onClick={() => {
              increaseQty(item.id);
            }}
          >
            +
          </button>
        </div>
        <button
          className="mx-4 cursor-pointer"
          onClick={() => removeCart(item.id)}
        >
          🗑️
        </button>
      </div>
    </>
  );
};

export default CartItemDetail;
