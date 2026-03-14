'use client';

import React from 'react';
import { Order } from '@/models/User';
import { useOrderByUser } from '@/hook/order/useOrderByUser';
import OrderItem from './OrderItem';

const OrderItemList = ({
  status,
  search,
}: {
  status: string;
  search: string;
}) => {
  const { orders, loading } = useOrderByUser(status, search);

  if (loading) return <p className="py-4 text-center">Đang tải đơn hàng...</p>;

  if (orders.length === 0)
    return <p className="py-4 text-center">Không tìm thấy đơn hàng nào.</p>;
  return (
    <div className="space-y-4">
      {orders.map((order: Order) => (
        <section
          key={order.id}
          className="bg-shop_bg rounded-md p-4 shadow-md shadow-black/10"
        >
          <OrderItem order={order} />
        </section>
      ))}
    </div>
  );
};

export default OrderItemList;
