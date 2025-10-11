'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Review } from '@/models/Product';
import StarRating from '../common/StarRating';

const ReviewProduct = ({ productId }: { productId: string }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  useEffect(() => {
    fetch(`http://localhost:3001/reviews/${productId}`).then((res) =>
      res.json().then((data) => setReviews(data))
    );
  });

  const star = reviews.map((review) => review.rating);
  const starAvg = star.reduce((acc, curr) => acc + curr, 0) / star.length;

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
              src={review.user.avatarUrl}
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
