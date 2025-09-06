'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';

export default function BannerSlider() {
  return (
    <div className="bg-linear-to-br from-red-400 to-blue-400">
      <div className="mx-4">
        <div className="mx-auto grid max-w-7xl grid-cols-1 space-y-8 py-8 text-white lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl">Công nghệ Tương lai</h1>
            <p>
              Khám phá những sản phẩm công nghệ tiên tiến nhất với giá cả cạnh
              tranh nhất thị trường
            </p>
          </div>
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation
            loop
            className="h-64 w-xl rounded-2xl"
          >
            <SwiperSlide>
              <Image
                src="/banner/banner1.jpg"
                fill
                alt="banner1"
                className="object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src="/banner/banner2.jpg"
                fill
                alt="banner2"
                className="object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src="/banner/banner3.jpg"
                fill
                alt="banner3"
                className="object-cover"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
