'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';
import Container from './Container';

export default function BannerSlider() {
  return (
    <section className="fashion-pattern relative overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 py-16">
      <Container>
        <div className="grid grid-cols-1 space-y-8 py-8 text-gray-900 lg:grid-cols-2">
          <div className="flex w-md flex-col gap-4">
            <h1 className="flex flex-col space-x-2 text-6xl font-bold">
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text py-2 text-transparent">
                Thời trang
              </span>{' '}
              <span>Xu hướng</span>
            </h1>
            <p className="text-lg">
              Khám phá bộ sưu tập thời trang mới nhất với phong cách độc đáo và
              chất lượng cao cấp
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
      </Container>
    </section>
  );
}
