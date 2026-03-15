import React, { useState } from 'react';
import { Variant } from '@/models/Product';
import { useProductVariants } from '@/hook/products/useProductVariants';

interface CartItemVariantSelectorProps {
  currentVariant: Variant;
  onConfirm: (newVariant: Variant) => void;
}

const CartItemVariantSelector = ({
  currentVariant,
  onConfirm,
}: CartItemVariantSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempVariant, setTempVariant] = useState(currentVariant);

  const { productVariants } = useProductVariants(
    currentVariant.productId,
    isOpen
  );

  const handleConfirm = () => {
    setIsOpen(false);
    onConfirm(tempVariant);
  };

  const handleCancel = () => {
    setIsOpen(false);
    setTempVariant(currentVariant); // Reset lại trạng thái ban đầu
  };

  // Nếu sản phẩm không có phân loại, ẩn luôn nút này
  if (productVariants && productVariants.length < 2) return null;

  return (
    <div className="relative mt-1 inline-block">
      {/* Nút bấm để mở Popup */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hover:text-shop_dark_blue flex items-center text-sm text-gray-500"
      >
        Phân loại hàng: {currentVariant?.color} {currentVariant?.size}
        <svg
          className="ml-1 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {/* Popup Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 z-50 mt-2 w-80 rounded border border-gray-200 bg-white p-4 shadow-xl">
          {/* Mũi tên nhỏ */}
          <div className="absolute -top-2 left-6 h-4 w-4 rotate-45 border-t border-l border-gray-200 bg-white"></div>

          <div className="relative z-10">
            <div className="mb-4">
              <span className="mb-2 block text-sm text-gray-500">
                Phân loại:
              </span>
              <div className="flex flex-wrap gap-2">
                {productVariants?.map((v: Variant) => {
                  const isSelected = tempVariant?.id === v.id;
                  return (
                    <button
                      key={v.id}
                      onClick={() => setTempVariant(v)}
                      className={`relative rounded border px-3 py-1 text-sm transition-all ${
                        isSelected
                          ? 'border-shop_dark_blue text-shop_dark_blue'
                          : 'hover:border-shop_dark_blue hover:text-shop_dark_blue border-gray-300 text-gray-700'
                      }`}
                    >
                      {v.color} {v.size}
                      {/* Dấu tick */}
                      {isSelected && (
                        <div className="absolute right-0 bottom-0 h-3 w-3 overflow-hidden">
                          <div className="bg-shop_dark_blue absolute -right-1 -bottom-1 h-3 w-3 rotate-45"></div>
                          <svg
                            className="absolute right-0 bottom-0 z-10 h-2 w-2 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2 border-t border-gray-400 pt-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm text-gray-600 uppercase hover:bg-gray-100"
              >
                Trở lại
              </button>
              <button
                onClick={handleConfirm}
                className="bg-shop_dark_blue hover:bg-shop_light_blue/90 px-4 py-2 text-sm text-white uppercase"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItemVariantSelector;
