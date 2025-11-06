'use client';
import React from 'react';

const shimmer =
  'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent';
const base = 'bg-gray-200 dark:bg-gray-700 rounded-lg';

const HomeSkeleton = () => {
  return (
    <div className="animate-fadeIn space-y-10">
      {/* Banner */}
      <div className={`${base} ${shimmer} h-56 w-full`} />

      {/* Danh mục thời trang */}
      <section className="space-y-4 text-center">
        <div className={`${base} ${shimmer} mx-auto h-6 w-52`} />
        <div className="grid grid-cols-2 justify-center gap-4 md:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={`${base} ${shimmer} h-24 rounded-xl`} />
          ))}
        </div>
      </section>

      {/* Sản phẩm nổi bật */}
      <section className="space-y-4">
        <div className={`${base} ${shimmer} mx-auto h-6 w-60`} />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="space-y-3 rounded-xl border border-gray-100 p-3 dark:border-gray-800"
            >
              <div className={`${base} ${shimmer} h-36 w-full rounded-lg`} />
              <div className={`${base} ${shimmer} mx-auto h-4 w-3/4`} />
              <div className={`${base} ${shimmer} mx-auto h-4 w-1/2`} />
            </div>
          ))}
        </div>
      </section>

      {/* Thương hiệu đối tác */}
      <section className="space-y-4 text-center">
        <div className={`${base} ${shimmer} mx-auto h-6 w-56`} />
        <div className="flex flex-wrap justify-center gap-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className={`${base} ${shimmer} h-12 w-24 rounded-md`}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomeSkeleton;
