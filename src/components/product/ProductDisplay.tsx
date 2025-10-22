'use client';

import { formatCurrency } from '@/lib/utils';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import StarRating from '../common/StarRating';
import Button from '../common/Button';
import { useProductContext } from '@/contexts/ProductContext';
import { useAuth } from '@/contexts/AuthContext';
import { useCartContext } from '@/contexts/CartContext';
import { Variant } from '@/models/Product';

const ProductDisplay = ({ productId }: { productId: string }) => {
  const { user } = useAuth();
  const { product, loading, setProductId, reviews } = useProductContext();
  const { addToCart } = useCartContext();

  const [colorSelected, setColorSelected] = useState<string | null>(null);
  const [sizeSelected, setSizeSelected] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [variant, setVariant] = useState<Variant | null>(null);

  useEffect(() => {
    setProductId(productId);
  });

  const colors = [...new Set(product?.variants.map((v) => v.color))];
  const sizes = [...new Set(product?.variants.map((v) => v.size))];

  const ratings = reviews.map((r) => r.rating);
  const avgRating = ratings.length
    ? ratings.reduce((a, b) => a + b, 0) / ratings.length
    : 0;

  useEffect(() => {
    if (sizeSelected && colorSelected) {
      const varient = product?.variants.find(
        (v) => v.color === colorSelected && v.size === sizeSelected
      );
      if (varient) setVariant(varient);
      else setVariant(null);
    }
  }, [product, sizeSelected, colorSelected]);

  const handleAdd = () => {
    console.log({
      user,
      product,
      variant,
      quantity,
    });
    if (product && variant) addToCart(product, variant, quantity);
  };

  //Làm Loading sau
  if (loading || !product) return <div>Loading...</div>;
  return (
    <section className="w-full bg-white">
      <div className="flex space-x-8 p-4">
        {/* Image */}
        <div className="relative mr-4 h-125 w-125 rounded-2xl p-2">
          <Image
            src={product.images[0].url}
            alt={`Brand image ${product.name}`}
            layout="fill"
            objectFit="contain"
            loading="lazy"
            quality={80}
          />
        </div>
        {/* Detail */}
        <div className="flex-1">
          <div>
            <h2 className="text-3xl">{product?.name}</h2>
            <div className="my-2 flex">
              <label className="flex items-center space-x-1">
                <p>{avgRating.toFixed(1)}</p>
                <StarRating count={Math.round(avgRating)} />
              </label>
              <p className="ml-4 flex items-center space-x-1 border-l-1 border-gray-300 pl-4">
                <span>{reviews.length}</span>
                <span className="text-sm text-gray-500">Đánh giá</span>
              </p>
            </div>
          </div>

          {/* Price Discount... */}
          <div>
            <div className="flex items-center space-x-2 bg-gray-50 px-4 py-2">
              <span className="text-shop_dark_blue text-4xl">
                {formatCurrency(
                  product.salePrice ? product.salePrice : product.price
                )}
              </span>
              {product.discountPercent !== 0 ? (
                <>
                  <span className="text-gray-400 line-through">
                    {formatCurrency(product?.price)}
                  </span>
                  <span className="text-shop_dark_blue rounded-sm bg-blue-300 px-1 text-sm font-semibold">
                    -{product.discountPercent}%
                  </span>
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="flex flex-col space-y-4">
              <section className="flex items-center gap-x-4 px-4 py-2">
                <label className="w-25 text-gray-400">Vận Chuyển</label>
                <div>Nhận từ 6 Th10 - 8 Th10, phí giao 0₫</div>
              </section>

              <section className="flex items-center gap-x-4 px-4 py-2">
                <label className="w-25 text-gray-400">Màu sắc</label>
                <div className="flex space-x-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      className={`hover:border-shop_dark_blue hover:text-shop_dark_blue min-w-20 border-1 border-gray-300 p-2 ${
                        color === colorSelected
                          ? 'border-shop_dark_blue text-shop_dark_blue'
                          : ''
                      }`}
                      onClick={() =>
                        setColorSelected((prev) =>
                          prev === color ? null : color
                        )
                      }
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </section>

              <section className="flex items-center gap-x-4 px-4 py-2">
                <label className="w-25 text-gray-400">Size</label>
                <div className="flex space-x-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      className={`hover:border-shop_dark_blue hover:text-shop_dark_blue min-w-20 border-1 border-gray-300 p-2 ${
                        size === sizeSelected
                          ? 'border-shop_dark_blue text-shop_dark_blue'
                          : ''
                      }`}
                      onClick={() =>
                        setSizeSelected((prev) => (prev === size ? null : size))
                      }
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </section>
              <section className="flex items-center gap-x-4 px-4 py-2">
                <label className="w-25 text-gray-400">Số lượng</label>
                <div>
                  <button
                    className="h-8 w-8 border-1 border-gray-400"
                    onClick={() => setQuantity(quantity - 1)}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    className="text-shop_dark_blue h-8 w-10 border-y-1 border-gray-400 text-center"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  />
                  <button
                    className="h-8 w-8 border-1 border-gray-400"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
                {variant ? (
                  <span>Còn {variant.stock} sản phẩm</span>
                ) : (
                  <span>Hết hàng</span>
                )}
              </section>
              <section className="flex space-x-4">
                <Button
                  className="rounded-xl py-4"
                  variant="outline"
                  onClick={handleAdd}
                >
                  🛒 Thêm vào giỏ hàng
                </Button>
                <Button className="rounded-xl py-4">Mua ngay</Button>
              </section>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDisplay;
