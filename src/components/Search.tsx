'use client';

import React, { useEffect, useRef, useState } from 'react';
import { SearchIcon, X } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Category, Product } from '@/models/Product';

const Search = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [searchParams, setSearchParams] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [tredingCategories, setTrendingCategories] = useState<Category[]>([]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (ref.current && target && !ref.current.contains(target)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchParams]);

  useEffect(() => {
    const delayBounce = setTimeout(() => {
      if (searchParams.trim()) {
        fetch(`http://localhost:3001/products/search?keyword=${searchParams}`)
          .then((res) => res.json())
          .then((data) => setResults(data));
      } else {
        setResults([]);
      }
    }, 400);

    return () => clearTimeout(delayBounce);
  }, [searchParams]);

  useEffect(() => {
    fetch('http://localhost:3001/categories/trend')
      .then((res) => res.json())
      .then((data) => setTrendingCategories(data));
  }, []);

  return (
    <div className="relative" ref={ref}>
      <input
        placeholder="Tìm kiếm sản phẩm..."
        type="text"
        className="w-2xl rounded-xl border-1 border-solid border-gray-500 px-10 py-2 text-gray-500 focus:border-gray-600 focus:ring-2 focus:ring-blue-500"
        value={searchParams}
        onChange={(e) => setSearchParams(e.target.value)}
        onFocus={() => setIsFocused(true)}
      />
      <SearchIcon className="absolute top-1/2 left-2.5 -translate-y-1/2 text-gray-500" />
      <X
        className="absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer text-gray-500"
        onClick={() => {
          setSearchParams('');
        }}
      />
      {isFocused && (
        <div className="absolute top-full left-0 z-50 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-md">
          <div>
            {/* Trending section */}
            <section className="border-b-2 border-gray-300 px-4 pb-4">
              <h2 className="my-4 text-lg font-semibold">🔥 Trending </h2>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {tredingCategories.map((item) => (
                  <button
                    key={item.id}
                    className="flex gap-x-2 rounded-xl border-1 border-blue-300 bg-blue-100 p-2 hover:bg-blue-200"
                  >
                    <div className="relative h-6 w-6">
                      <Image
                        src={item.iconUrl}
                        alt={`Category image ${item.name}`}
                        layout="fill"
                        objectFit="contain"
                        loading="lazy"
                        quality={75}
                      />
                    </div>
                    <p>{item.name}</p>
                  </button>
                ))}
              </div>
            </section>
            {/* Suggest products or search history section */}
            {searchParams ? (
              <section className="border-b-2 border-gray-300 px-4 pb-4">
                <h2 className="my-4 text-lg font-semibold">
                  🛍️ Kết quả tìm kiếm
                </h2>
                <section className="max-h-100 overflow-y-scroll">
                  {results.length === 0 ? (
                    <section className="flex flex-col items-center justify-center gap-y-1 py-10 text-lg text-gray-600">
                      <label className="text-5xl">🔍</label>
                      <label>{`Không tìm ra từ khóa "${searchParams}"`}</label>
                      <label>
                        Thử tìm kiếm với từ khóa khác hoặc theo danh mục
                      </label>
                    </section>
                  ) : (
                    results.map((item) => (
                      <Link
                        href={`/product/${item.id}`}
                        key={item.id}
                        className="my-4 flex cursor-pointer rounded-2xl px-2 duration-200 ease-out hover:-translate-y-2 hover:shadow-md hover:shadow-black/20"
                      >
                        <div className="relative my-2 mr-4 h-18 w-18 rounded-2xl p-2">
                          <Image
                            src={item.images[0]?.url}
                            alt={`Brand image ${item.name}`}
                            layout="fill"
                            objectFit="contain"
                            loading="lazy"
                            quality={75}
                          />
                        </div>
                        <div className="flex flex-1 items-center justify-between">
                          <div className="flex flex-col">
                            <div className="text-lg font-semibold">
                              {item.name}
                            </div>
                            <label className="flex space-x-2 text-gray-500">
                              <p>{item.category ? item.category.name : ''}</p>
                              <span>|</span>
                              <p>
                                ⭐
                                {item.reviews.length > 0
                                  ? item.reviews.reduce(
                                      (acc, r) => acc + r.rating,
                                      0
                                    ) / item.reviews.length
                                  : 0}
                              </p>
                            </label>
                          </div>
                          <div className="flex-end">
                            <label className="text-shop_dark_blue text-lg font-semibold">
                              {formatCurrency(
                                item.salePrice ? item.salePrice : item.price
                              )}
                            </label>
                          </div>
                        </div>
                      </Link>
                    ))
                  )}
                </section>
              </section>
            ) : (
              <section className="border-b-2 border-gray-300 px-4 pb-4">
                <h2 className="my-4 text-lg font-semibold">
                  🕒 Lịch sử tìm kiếm
                </h2>
              </section>
            )}
            <section className="rounded-b-lg bg-gray-100 p-4 text-sm text-gray-600">
              <p>
                💡 Tip: Use quotes for exact matches • ⌨️ Press Enter to search
              </p>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
