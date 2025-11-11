'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useFavourite } from '@/hook/UseFavourite';
import { Heart, X } from 'lucide-react';
import Button from '../common/Button';
import { Favourite } from '@/models/Product';
import { formatCurrency } from '@/lib/utils';
import Image from 'next/image';
import { defaultAvatar } from '@/images';
import { useDeleteFavourite } from '@/hook/useDeleteFavourite';

const FavouriteProductList = () => {
  const { user, token } = useAuth();
  const { favourites, loading } = useFavourite(token);
  const { deleteFavourite } = useDeleteFavourite();
  if (!user || loading || !favourites) {
    return <p>...Loading</p>;
  } else if (favourites.length === 0) {
    return (
      <div className="flex flex-col items-center space-y-4 py-48 text-center">
        <div>
          <Heart className="text-gray-500" width={60} height={60} />
        </div>
        <div>
          <h2 className="text-2xl font-bold">
            Danh sách yêu thích của bạn đang trống
          </h2>
          <p>Các sản phẩm bạn thêm vào yêu thích sẽ nằm ở đây</p>
        </div>
        <Button href="/shop ">Tiếp tục xem sản phẩm</Button>
      </div>
    );
  }

  const handleRemove = (id: string, itemName: string) => {
    if (confirm(`Bạn chắc chắn muốn xoá "${itemName}"?`)) {
      deleteFavourite(id);
    }
  };

  return (
    <div className="min-h-140">
      <table className="text-lg">
        <thead>
          <tr>
            <th className="text-md px-6 py-4 text-left font-semibold">
              Ảnh và tên sản phẩm
            </th>
            <th className="text-md px-6 py-4 text-left font-semibold">
              Danh mục
            </th>
            <th className="text-md px-6 py-4 text-left font-semibold">
              Trạng thái
            </th>
            <th className="text-md px-6 py-4 text-left font-semibold">Giá</th>
            <th className="text-md px-6 py-4 text-left font-semibold">
              Hành động
            </th>
          </tr>
        </thead>
        <tbody>
          {favourites.map((item: Favourite) => (
            <tr key={item.id} className="table-row">
              <td className="text-md flex items-center gap-x-2 px-6 py-4 text-left font-light">
                <X
                  className="cursor-pointer font-extralight"
                  onClick={() => handleRemove(item.id, item.product.name)}
                />
                <div className={`relative h-24 w-24 border-2 border-gray-200`}>
                  <Image
                    src={item.product.images[0].url || defaultAvatar}
                    alt={`Order Img`}
                    layout="fill"
                    objectFit="contain"
                    loading="lazy"
                    quality={75}
                  />
                </div>
                {item.product?.name}
              </td>
              <td className="text-md px-6 py-4 text-left font-light">
                {item.product.category.name}
              </td>
              <td className="text-md px-6 py-4 text-left font-light">
                {item.product.variants.length > 0 ? (
                  <span className="text-green-600">Còn hàng</span>
                ) : (
                  <span className="text-red-600">Hết hàng</span>
                )}
              </td>
              <td className="text-md px-6 py-4 text-left font-light">
                {formatCurrency(item.product?.price)}
              </td>
              <td className="text-md px-6 py-1 text-left font-light">
                <Button
                  href={`/product/${item.productId}`}
                  className="rounded-xl py-4"
                  variant="outline"
                  // onClick={handleAdd}
                >
                  Xem sản phẩm
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FavouriteProductList;
