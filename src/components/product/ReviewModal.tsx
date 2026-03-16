import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { Order } from '@/models/User';
import { useSubmitReview } from '@/hook/order/useSubmitReview';

export default function ReviewModal({
  isOpen,
  onClose,
  order,
}: {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
}) {
  const { submitReviews } = useSubmitReview();

  // 1. STATE LƯU TRỮ: Mảng chứa dữ liệu đánh giá của TỪNG sản phẩm
  const [reviews, setReviews] = useState<{ rating: number; comment: string }[]>(
    []
  );

  // 2. KHOỞI TẠO DỮ LIỆU: Mỗi khi mở Modal, tạo ra mảng mặc định (5 sao, text rỗng) tương ứng với số lượng sản phẩm
  useEffect(() => {
    if (isOpen && order?.items) {
      setReviews(order.items.map(() => ({ rating: 5, comment: '' })));
    }
  }, [isOpen, order]);

  // 3. HÀM CẬP NHẬT: Thay đổi sao hoặc text của một sản phẩm cụ thể dựa vào index
  const handleUpdateReview = (
    index: number,
    field: 'rating' | 'comment',
    value: string | number
  ) => {
    const newReviews = [...reviews];
    newReviews[index] = { ...newReviews[index], [field]: value };
    setReviews(newReviews);
  };

  // 4. HÀM SUBMIT: Gắn vào nút Hoàn Thành để gọi API
  const handleSubmit = async () => {
    // Chuẩn bị payload để gửi lên backend
    const payload = order.items.map((item, index) => ({
      productId: item.productId,
      variantId: item.variantId,
      rating: reviews[index].rating,
      comment: reviews[index].comment,
    }));

    console.log('Dữ liệu chuẩn bị gửi lên backend:', payload);

    // Gọi Hook
    submitReviews({ payload, orderId: order.id });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="bg-opacity-40 fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-70">
      <div className="animate-in fade-in zoom-in flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded bg-white shadow-xl duration-200">
        <div className="shrink-0 border-b border-gray-400 px-6 py-4 text-xl font-medium text-gray-800">
          Đánh Giá Sản Phẩm
        </div>

        <div className="flex-1 space-y-8 overflow-y-auto p-6">
          {order.items.map((item, index) => (
            <div
              key={index}
              className="border-b border-gray-200 pb-8 last:border-0 last:pb-0"
            >
              {/* Product Info */}
              <div className="mb-6 flex items-center gap-4">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded border bg-gray-100">
                  <Image
                    src={item.imageUrl}
                    alt={item.productName || `Review IMG`}
                    layout="fill"
                    objectFit="contain"
                    loading="lazy"
                    quality={75}
                  />
                </div>
                <div>
                  <h3 className="line-clamp-1 text-sm text-gray-800">
                    {item.productName}
                  </h3>
                  <p className="mt-1 text-xs text-gray-400">
                    Phân loại hàng: {item.varient?.color}, {item.varient?.size}
                  </p>
                </div>
              </div>

              {/* Rating Stars */}
              <div className="mb-6 flex items-center gap-4">
                <span className="text-sm text-gray-700">
                  Chất lượng sản phẩm
                </span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => {
                    // Lấy số sao hiện tại của sản phẩm này
                    const currentRating = reviews[index]?.rating || 5;

                    return (
                      <Star
                        key={star}
                        size={24}
                        className={`cursor-pointer ${
                          star <= currentRating
                            ? 'fill-[#ffce3d] text-[#ffce3d]'
                            : 'fill-gray-200 text-gray-200'
                        }`}
                        onClick={() =>
                          handleUpdateReview(index, 'rating', star)
                        }
                      />
                    );
                  })}
                </div>
                {reviews[index]?.rating === 5 && (
                  <span className="text-sm font-medium text-[#ffce3d]">
                    Tuyệt vời
                  </span>
                )}
              </div>

              {/* Review Input Section */}
              <div className="rounded border border-gray-200 bg-[#f8f8f8] p-4 text-sm">
                <textarea
                  className="h-20 w-full resize-none bg-transparent text-gray-700 placeholder-gray-400 focus:ring-0 focus:outline-none"
                  placeholder="Hãy chia sẻ những điều bạn thích về sản phẩm này với những người mua khác nhé."
                  value={reviews[index]?.comment || ''}
                  onChange={(e) =>
                    handleUpdateReview(index, 'comment', e.target.value)
                  }
                ></textarea>
              </div>
            </div>
          ))}
        </div>

        <div className="flex shrink-0 justify-end gap-2 border-t border-gray-400 bg-white px-6 py-4">
          <button
            onClick={onClose}
            className="border border-transparent bg-white px-6 py-2 text-sm font-medium text-gray-600 uppercase hover:bg-gray-50"
          >
            Trở lại
          </button>
          {/* Gắn hàm handleSubmit vào nút này */}
          <button
            onClick={handleSubmit}
            className="rounded-sm bg-[#ee4d2d] px-8 py-2 text-sm font-medium text-white uppercase shadow-sm transition-colors hover:bg-[#d74326]"
          >
            Hoàn thành
          </button>
        </div>
      </div>
    </div>
  );
}
