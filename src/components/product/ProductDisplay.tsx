'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';

import StarRating from '../common/StarRating';
import Button from '../common/Button';
import { formatCurrency } from '@/lib/utils';
import { Review, Variant } from '@/models/Product';
import { useReviews } from '@/hook/useReviews';
import { useProduct } from '@/hook/products/useProduct';
import { useFavouriteToggle } from '@/hook/favourite/useFavouriteToggle';
import { useAddCart } from '@/hook/cart/useAddCart';

const ProductDisplay = ({ productId }: { productId: string }) => {
  const { product, loading } = useProduct(productId);
  const { reviews } = useReviews(productId);
  const { isLiked, toggle } = useFavouriteToggle(productId);
  const { addCart } = useAddCart();

  const [colorSelected, setColorSelected] = useState<string | null>(null);
  const [sizeSelected, setSizeSelected] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [variant, setVariant] = useState<Variant | null>(null);

  useEffect(() => {
    if (sizeSelected && colorSelected) {
      const matched = product?.variants.find(
        (v: Variant) => v.color === colorSelected && v.size === sizeSelected
      );
      setVariant(matched ?? null);
    } else setVariant(null);
  }, [product, sizeSelected, colorSelected]);

  if (loading || !product) return <p>Loading...</p>;

  const isDisabled = !colorSelected || !sizeSelected || !variant?.stock;

  //Hàm này ngăn ngừa việc thiếu hụt size màu trong varient của 1 sản phẩm
  //Hàm lấy size theo màu tồn tại trong dữ liệu
  const availableSizes = product?.variants
    .filter((v: Variant) => v.color === colorSelected)
    .map((v: Variant) => v.size);

  const colors = Array.from(
    new Set(product?.variants.map((v: Variant) => v.color))
  ) as string[];

  const ratings = reviews.map((r: Review) => r.rating);
  const avgRating = ratings.length
    ? ratings.reduce((a: number, b: number) => a + b, 0) / ratings.length
    : 0;

  const handleAdd = () => {
    if (product && variant)
      addCart({ productId: product.id, variantId: variant.id, quantity });
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
            fill
            loading="lazy"
            quality={75}
            sizes="100%"
            className="object-contain"
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
                      onClick={() => {
                        setColorSelected((prev) =>
                          prev === color ? null : color
                        );
                      }}
                    >
                      {String(color)}
                    </button>
                  ))}
                </div>
              </section>

              <section className="flex items-center gap-x-4 px-4 py-2">
                <label className="w-25 text-gray-400">Size</label>
                <div className="flex space-x-2">
                  {availableSizes && availableSizes?.length !== 0 ? (
                    availableSizes?.map((size: string) => (
                      <button
                        key={size}
                        className={`hover:border-shop_dark_blue hover:text-shop_dark_blue min-w-20 border-1 border-gray-300 p-2 ${
                          size === sizeSelected
                            ? 'border-shop_dark_blue text-shop_dark_blue'
                            : ''
                        }`}
                        onClick={() =>
                          setSizeSelected((prev) =>
                            prev === size ? null : size
                          )
                        }
                      >
                        {size}
                      </button>
                    ))
                  ) : (
                    <p className="py-2.5">Vui lòng chọn Màu sản phẩm trước</p>
                  )}
                </div>
              </section>
              <section className="flex items-center gap-x-4 px-4 py-2">
                <label className="w-25 text-gray-400">Số lượng</label>
                <div>
                  <button
                    className="h-8 w-8 border-1 border-gray-400 disabled:opacity-40"
                    onClick={() => setQuantity(quantity - 1)}
                    disabled={isDisabled || quantity === 1}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    className="text-shop_light_blue h-8 w-10 border-y-1 border-gray-400 text-center disabled:opacity-40"
                    value={quantity}
                    disabled={isDisabled}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  />
                  <button
                    className="h-8 w-8 border-1 border-gray-400 disabled:opacity-40"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={isDisabled || quantity === variant.stock}
                  >
                    +
                  </button>
                </div>
                {sizeSelected && colorSelected ? (
                  variant ? (
                    <span>Còn {variant.stock} sản phẩm</span>
                  ) : (
                    <span>Hết hàng</span>
                  )
                ) : (
                  <span></span>
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
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggle()}
                    className="cursor-pointer rounded-full"
                  >
                    <Heart
                      fill={isLiked ? 'red' : 'none'}
                      width={32}
                      height={32}
                    />
                  </button>
                  <span>Yêu thích</span>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDisplay;
