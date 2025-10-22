'use client';

import React from 'react';
import * as motion from 'motion/react-client';
import Image from 'next/image';
import { Product } from '@/models/Product';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';

const ProductCard = ({ product }: { product: Product }) => {
  const ratings = product.reviews.map((r) => r.rating);
  const avgRating = ratings.length
    ? ratings.reduce((a, b) => a + b, 0) / ratings.length
    : 0;

  return (
    <>
      <motion.div
        className="border-shop_dark_blue rounded-2xl hover:border-1"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.95 }}
      >
        <div key={product.id}>
          <div className="rounded-2xl shadow-md shadow-black/10 hover:shadow-lg">
            <Link
              href={`/product/${product.id}`}
              className="relative cursor-pointer"
            >
              <div className="flex h-70 items-center justify-center">
                <Image
                  src={product.images[0].url}
                  alt="product-img"
                  className="rounded-t-2xl object-cover"
                  fill
                  sizes="100%"
                />
              </div>
              <div className="absolute inset-1 top-3 mx-3 flex justify-between">
                {product.discountPercent !== 0 &&
                product.discountPercent != undefined ? (
                  <div className="flex h-8 w-16 items-center justify-center rounded-2xl bg-red-600 font-semibold text-white">
                    {`-${product.discountPercent}%`}
                  </div>
                ) : (
                  <></>
                )}
                {product.status && (
                  <div
                    className={`flex h-8 w-16 items-center justify-center rounded-2xl font-semibold ${product.status.includes('HOT') || product.status.includes('BEST') ? 'bg-yellow-400 text-black' : 'bg-green-400 text-white'}`}
                  >
                    {product.status}
                  </div>
                )}
              </div>
            </Link>

            <div className="flex flex-col gap-y-4 rounded-b-2xl bg-white p-6">
              <h3 className="truncate text-xl font-semibold">{product.name}</h3>
              {/* <p className="line-clamp-2">{product.description}</p> */}
              <div className="flex gap-x-2">
                {product.discountPercent === 0 ? (
                  <span className="text-shop_dark_blue text-2xl font-bold">
                    {formatCurrency(product.price)}
                  </span>
                ) : (
                  <>
                    <span className="text-shop_dark_blue text-2xl font-bold">
                      {formatCurrency(
                        product.salePrice ? product.salePrice : product.price
                      )}
                    </span>
                    <span className="text-gray-500 line-through">
                      {formatCurrency(product.price)}
                    </span>
                  </>
                )}
              </div>
              <div className="flex">
                {/* <span>{product.rating}</span> */}
                <span>⭐{avgRating.toFixed(1)}</span>
                {/* <span className="text-gray-700">{`(${product.reviews_count} đánh giá)`}</span> */}
              </div>

              {/* Cái này sẽ đưa vào ProductDetail */}
              {/* Size */}
              <div className="flex items-center justify-between">
                {/* <span>Size:</span> */}
                {/* <div className="flex space-x-2">
                {.map((variant, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSizeSelected(variant)}
                  >
                    <span
                      className={`text-md hover:text-shop_dark_blue hover:border-shop_dark_blue flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 ${
                        1 === 1
                          ? 'from-shop_light_blue to-shop_dark_blue hover:text-shop_dark_blue bg-red-200 bg-gradient-to-br text-white'
                          : 'border-black text-black'
                      }`}
                    >
                      <div className={`bg-${variant}-300`}>{}</div>
                    </span>
                  </motion.div>
                ))}
              </div> */}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ProductCard;
