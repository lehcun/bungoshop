'use client';

import Image from 'next/image';
import React from 'react';
import StarRating from '../common/StarRating';
import { useProductContext } from '@/contexts/ProductContext';
import { defaultAvatar } from '@/images';

const ReviewProduct = () => {
  const { reviews, loading } = useProductContext();

  if (loading) return <div>Loading reviews...</div>;

  const starAvg =
    reviews.length > 0
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
      : 0;

  return (
    <div className="w-full bg-white p-4">
      <h2 className="text-xl">ĐÁNH GIÁ SẢN PHẨM</h2>
      <div className="my-4 border-1 border-blue-200 bg-blue-100 px-4 py-8">
        <p>
          <span className="text-3xl">{starAvg.toFixed(1)}</span> trên 5
        </p>
        <span className="text-2xl">⭐⭐⭐⭐⭐</span>
      </div>
      {/* Review */}
      {reviews.map((review) => (
        <section key={review.id} className="flex space-x-4 p-4">
          <label>
            <Image
              src={review.user.avatarUrl && defaultAvatar}
              width={48}
              height={48}
              alt="user-avt"
              className="rounded-full"
            />
          </label>
          <div
            key={review.id}
            className="flex flex-col space-y-2 border-b-1 border-gray-300 pb-8"
          >
            <label>{review.user.name}</label>
            <StarRating count={review.rating} />
            <label className="text-sm text-gray-500">
              <>{review.createdAt.slice(0, 10)}</> <>| Phân loại hàng: </>
              <>
                {review.variant.color} {review.variant.size}
              </>
            </label>
            <p>{review.comment}</p>
          </div>
        </section>
      ))}
    </div>
  );
};

export default ReviewProduct;
