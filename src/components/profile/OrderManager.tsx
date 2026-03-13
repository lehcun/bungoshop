'use client';

import React, { useState } from 'react';
import OrderSearchAndFilter from './OrderSearchAndFilter';
import OrderItemList from './OrderItemList';

const OrderManager = () => {
  // 1. Quản lý State chung ở đây
  const [status, setStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-4">
      {/* 2. Truyền hàm set state xuống cho Filter */}
      <OrderSearchAndFilter
        activeStatus={status}
        setStatus={setStatus}
        setSearchTerm={setSearchTerm}
      />

      {/* 3. Truyền state hiện tại xuống cho List để gọi API */}
      <OrderItemList status={status} search={searchTerm} />
    </div>
  );
};

export default OrderManager;
