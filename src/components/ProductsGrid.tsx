import React from 'react';
import * as motion from 'motion/react-client';

import { mockApi } from '../../constants/data';

const ProductsGrid = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mx-4">
          <div className="flex flex-col gap-y-2 text-center">
            <h2 className="text-3xl font-semibold">Sản phẩm nổi bật</h2>
            <span className="text-lg text-gray-600">
              Những món đồ được yêu thích nhất
            </span>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-x-8 md:grid-cols-2 lg:grid-cols-4">
            {mockApi.featuredProducts.map((product) => (
              <div key={product.id} className="overflow-hidden">
                <div className={`rounded-2xl bg-white`}>
                  <div className="relative">
                    <div
                      className={`${product.bgColor} flex h-80 items-center justify-center rounded-t-2xl`}
                    >
                      <span className="text-8xl">{product.icon}</span>
                    </div>
                  </div>
                  <div className="absolute right-0 bg-black text-white">
                    HOT
                  </div>
                  <div className="flex flex-col gap-y-4 p-6">
                    <h3 className="truncate text-xl font-semibold">
                      {product.name}
                    </h3>
                    <p className="line-clamp-2">{product.description}</p>
                    <div className="flex">
                      {/* <span>{product.rating}</span> */}
                      <span>⭐⭐⭐⭐⭐</span>
                      <span className="text-gray-700">{`(${product.reviews_count} đánh giá)`}</span>
                    </div>
                    <div className="flex gap-x-2">
                      <span className="text-shop_dark_blue text-2xl font-bold">
                        {`${product.price}₫`}
                      </span>
                      {product.original_price ? (
                        <span className="text-gray-500 line-through">
                          {`${product.original_price}₫`}
                        </span>
                      ) : (
                        ''
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Size:</span>
                      <div className="flex space-x-2">
                        {product.variants.map((variant, index) => (
                          <motion.div
                            key={index}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <span className="text-md hover:text-shop_dark_blue flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2">
                              {variant}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    <motion.div
                      className="from-shop_light_blue/70 to-shop_light_blue cursor-pointer rounded-2xl bg-gradient-to-r py-4 text-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <button>🛒 Thêm vào giỏ</button>
                    </motion.div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsGrid;
