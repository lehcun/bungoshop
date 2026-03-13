'use client';

import React, { useState } from 'react';
import { useDebounce } from 'use-debounce';
import OrderSearchAndFilter from './OrderSearchAndFilter';
import OrderItemList from './OrderItemList';

const OrderManager = () => {
  // 1. Quản lý State chung ở đây
  const [status, setStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [debouncedSearch] = useDebounce(searchTerm, 1000);

  return (
    <div className="space-y-4">
      {/* 2. Truyền hàm set state xuống cho Filter */}
      <OrderSearchAndFilter
        activeStatus={status}
        searchTerm={searchTerm}
        setStatus={setStatus}
        setSearchTerm={setSearchTerm}
      />

      {/* 3. Truyền state hiện tại xuống cho List để gọi API */}
      <OrderItemList status={status} search={debouncedSearch} />
    </div>
  );
};

export default OrderManager;
