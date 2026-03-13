import React from 'react';
import Image from 'next/image';
import { formatCurrency, formatOrderDate } from '@/lib/utils';
import { Order } from '@/models/User';

const OrderItem = ({ order }: { order: Order }) => {
  const statusHandle = (status: string | null, totalPrice: number) => {
    let textCss = '';
    let bgCss = '';
    let title = '';
    if (status === 'PENDING') {
      title = 'Chờ xử lý';
      textCss = 'text-yellow-700';
      bgCss = 'bg-yellow-400';
    } else if (status === 'PAID') {
      title = 'Đã thanh toán';
      textCss = 'text-blue-700';
      bgCss = 'bg-blue-200 ';
    } else if (status === 'SHIPPED') {
      title = 'Đang giao';
      textCss = 'text-orange-700';
      bgCss = 'bg-orange-200 ';
    } else if (status === 'COMPLETED') {
      title = 'Hoàn thành';
      textCss = 'text-green-700';
      bgCss = 'bg-green-200 ';
    } else if (status === 'CANCELED') {
      title = 'Đã hủy';
      textCss = ' text-red-700';
      bgCss = 'bg-red-400';
    } else if (status === 'REFUNDED') {
      title = 'Đã hoàn tiền';
      textCss = 'text-red-700';
      bgCss = 'bg-red-400';
    } else {
    }

    return (
      <>
        <label className={`rounded-full p-1 text-center ${textCss} ${bgCss}`}>
          {title}
        </label>
        <label className={`text-xl font-semibold ${textCss}`}>
          {formatCurrency(totalPrice)}
        </label>
      </>
    );
  };

  return (
    <div className="px-4">
      <div className="flex">
        <div className="flex-1">
          <h3 className="text-xl font-semibold">Đơn hàng {order.id}</h3>
          <span className="text-gray-600">
            Đặt ngày: {formatOrderDate(order.createdAt)}
          </span>
        </div>
        <div className="flex flex-col text-right">
          {statusHandle(order.status, order.totalPrice)}
        </div>
      </div>
      <div className="space-y-3 border-b-1 border-gray-300 pb-4">
        {order.items.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-x-2 rounded-2xl bg-gray-100 p-2"
          >
            <div className="relative h-18 w-18 overflow-hidden rounded-2xl">
              {/* Chiều cao cố định, điều chỉnh theo logo */}
              <Image
                src={item.imageUrl}
                alt={`Product varient img`}
                fill
                loading="lazy"
                quality={75}
                className="object-contain"
                sizes="100%"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-lg">{item.productName}</label>
              <label className="text-gray-500">
                Size {item.varient?.size}, {item.varient?.color} - SL:{' '}
                {item.quantity}
              </label>
              <label className="text-shop_dark_blue font-semibold">
                {formatCurrency(item.price)}
              </label>
            </div>
          </div>
        ))}
      </div>
      <div className="space-x-4 py-2">
        <div className="flex justify-end space-x-2">
          <button className="bg-shop_btn_blue hover:bg hover:bg-shop_dark_blue rounded-sm px-10 py-2 font-medium text-white transition-colors">
            Đánh Giá
          </button>
          <button className="rounded-sm border border-gray-300 px-4 py-2 transition-colors hover:bg-gray-50">
            Yêu Cầu Trả Hàng/Hoàn Tiền
          </button>
          <button className="flex items-center rounded-sm border border-gray-300 px-4 py-2 transition-colors hover:bg-gray-50">
            Mua lại
          </button>
        </div>
      </div>
    </div>

    // <div className="max-w-4xl mx-auto bg-white border border-gray-200 shadow-sm rounded-sm font-sans text-sm">

    //   {/* --- Header: Shop Info --- */}
    //   <div className="flex items-center justify-between p-3 border-b border-gray-100">
    //     <div className="flex items-center space-x-3">
    //       <span className="bg-[#ee4d2d] text-white text-[10px] px-1 rounded-sm font-semibold uppercase">
    //         Yêu thích
    //       </span>
    //       <span className="font-bold text-gray-800">whose.studio</span>
    //       <button className="flex items-center space-x-1 border border-gray-300 px-2 py-1 rounded-sm text-xs hover:bg-gray-50">
    //          <span className="text-[#ee4d2d]">💬</span>
    //          <span>Chat</span>
    //       </button>
    //       <button className="flex items-center space-x-1 border border-gray-300 px-2 py-1 rounded-sm text-xs hover:bg-gray-50">
    //          <span>🏪 Xem Shop</span>
    //       </button>
    //     </div>
    //     <div className="flex items-center text-[#26aa99] space-x-1">
    //       <span className="text-lg">🚚</span>
    //       <span className="border-r pr-2 border-gray-300">Giao hàng thành công</span>
    //       <span className="pl-2 text-[#ee4d2d] font-medium">HOÀN THÀNH</span>
    //     </div>
    //   </div>

    //   {/* --- Body: Product Info --- */}
    //   <div className="p-4 flex items-start space-x-4 border-b border-dotted border-gray-200">
    //     <div className="relative w-20 h-20 border border-gray-100">
    //       <img
    //         src="/denim-jacket.jpg" // Thay bằng link ảnh thật của bạn
    //         alt="Denim Jacket"
    //         className="object-cover w-full h-full"
    //       />
    //     </div>
    //     <div className="flex-1">
    //       <h3 className="text-base text-gray-800 line-clamp-1">
    //         DENIM JACKET - Áo khoác denim xanh chỉ trắng Whose Studio
    //       </h3>
    //       <p className="text-gray-500 mt-1">Phân loại hàng: Đen chỉ trắng, M</p>
    //       <p className="text-gray-800 mt-1 font-medium">x1</p>
    //     </div>
    //     <div className="text-right">
    //       <span className="text-gray-400 line-through mr-2">350.000₫</span>
    //       <span className="text-[#ee4d2d] font-semibold text-base">289.000₫</span>
    //     </div>
    //   </div>

    //   {/* --- Footer: Pricing & Buttons --- */}
    //   <div className="p-4 bg-[#fffefb]">
    //     <div className="flex justify-end items-center mb-6">
    //       <span className="text-gray-600 mr-3">Thành tiền:</span>
    //       <span className="text-[#ee4d2d] text-2xl font-semibold">234.090₫</span>
    //     </div>

    //     <div className="flex flex-wrap items-center justify-between gap-4">
    //       <div className="text-xs text-gray-500 max-w-xs">
    //         Đánh giá sản phẩm trước <span className="underline cursor-pointer">03-03-2026</span>
    //         <p className="text-[#ee4d2d] mt-1 cursor-pointer">Đánh giá ngay và nhận 300 Xu</p>
    //       </div>

    //       <div className="flex space-x-2">
    //         <button className="bg-[#ee4d2d] text-white px-10 py-2 rounded-sm hover:bg-[#d73211] transition-colors font-medium">
    //           Đánh Giá
    //         </button>
    //         <button className="border border-gray-300 px-4 py-2 rounded-sm hover:bg-gray-50 transition-colors">
    //           Yêu Cầu Trả Hàng/Hoàn Tiền
    //         </button>
    //         <button className="border border-gray-300 px-4 py-2 rounded-sm hover:bg-gray-50 transition-colors flex items-center">
    //           Thêm <span className="ml-1 text-[10px]">▼</span>
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default OrderItem;
