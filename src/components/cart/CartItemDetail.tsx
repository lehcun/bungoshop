import React from 'react';
import Image from 'next/image';
import { formatCurrency } from '@/lib/utils';
import { CartItem, Variant } from '@/models/Product';
import { useRemoveCartItem } from '@/hook/cart/useRemoveCartItem';
import { useIncreaseQuantity } from '@/hook/cart/useIncreaseQuantity';
import { useDecreaseQuantity } from '@/hook/cart/useDecreaseQuantity';
import CartItemVariantSelector from './CartItemVariantSelector';
import { useUpdateCartVariant } from '@/hook/cart/useUpdateCartVariant';

const CartItemDetail = ({
  item,
  selectedItems,
  toggleSelect,
}: {
  item: CartItem;
  selectedItems: CartItem[];
  toggleSelect: (item: CartItem) => void;
}) => {
  const { updateVariant } = useUpdateCartVariant();
  const { decreaseQty } = useDecreaseQuantity();
  const { increaseQty } = useIncreaseQuantity();
  const { removeCart } = useRemoveCartItem();
  const decrease = (id: string) => {
    if (item.quantity === 1) {
      removeCart(id);
    } else {
      decreaseQty({ cartItemId: item.id, decrementAmount: -1 });
    }
  };

  // Bắt sự kiện khi người dùng bấm "Xác nhận" ở Popup
  const handleUpdateVariant = (newVariant: Variant) => {
    if (item.variant?.id !== newVariant.id) {
      updateVariant({ cartItemId: item.id, newVariantId: newVariant.id });
    }
  };

  return (
    <>
      <div className="flex">
        <input
          type="checkbox"
          checked={selectedItems.includes(item)}
          onChange={() => toggleSelect(item)}
          className="m-auto mr-4 h-5 w-5 cursor-pointer accent-blue-500"
        />
        <div className={`relative mr-4 h-24 w-24 rounded-2xl p-2`}>
          <Image
            src={item.product.images[0].url}
            alt={`Brand image ${item.product.name}`}
            layout="fill"
            objectFit="contain"
            loading="lazy"
            quality={75}
          />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold">{item.product.name}</h3>
            <CartItemVariantSelector
              currentVariant={item.variant}
              onConfirm={handleUpdateVariant}
            />
          </div>
          <div className="flex gap-x-2">
            <span className="text-shop_dark_blue text-xl font-bold">
              {formatCurrency(item.priceAtAdd * item.quantity)}
            </span>
            {item.product.price <= item.priceAtAdd ? (
              <></>
            ) : (
              <span className="text-gray-500 line-through">
                {formatCurrency(item.product.price * item.quantity)}
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
              increaseQty({ cartItemId: item.id, incrementAmount: 1 }); //Tăng 1 sản phẩm
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
