import Skeleton from 'react-loading-skeleton';

// SKELETON LOADING – GIỐNG HỆT THẬT
export const ProductSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      {/* Badge skeleton */}
      <div className="absolute top-2 left-2 z-10">
        <Skeleton width={48} height={20} borderRadius={999} />
      </div>

      {/* Ảnh skeleton */}
      <div className="h-48 bg-gray-100 p-4">
        <Skeleton height="100%" />
      </div>

      {/* Tên */}
      <div className="px-3 pt-3">
        <Skeleton count={2} />
      </div>

      {/* Giá */}
      <div className="flex gap-2 px-3 py-2">
        <Skeleton width={90} height={24} />
        <Skeleton width={60} height={16} />
      </div>

      {/* Rating */}
      <div className="px-3 pb-3">
        <Skeleton width={60} />
      </div>
    </div>
  );
};
