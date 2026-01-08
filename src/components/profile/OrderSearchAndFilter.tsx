import React from 'react';

const OrderSearchAndFilter = () => {
  const filterOptions = [
    {
      icon: '📦',
      name: 'Tất cả',
      count: '47',
    },
    {
      icon: '⏳',
      name: 'Chờ xử lý',
      count: '3',
    },
    {
      icon: '🚚',
      name: 'Đang giao',
      count: '8',
    },
    {
      icon: '✅',
      name: 'Hoàn thành',
      count: '34',
    },
    {
      icon: '❌',
      name: 'Đã hủy',
      count: '2',
    },
  ];

  return (
    <section className="flex space-x-4 rounded-md bg-white p-4 shadow-md shadow-black/10">
      <div className="flex flex-1 flex-wrap gap-2">
        {filterOptions.map((item) => (
          <div
            key={item.name}
            className="flex cursor-pointer space-x-1 rounded-lg bg-gray-200 p-2 hover:bg-gray-100"
          >
            <div>{item.icon}</div>
            <div>
              {item.name}({item.count})
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="text"
          placeholder="🔍 Tìm kiếm đơn hàng..."
          className="w-64 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
        />
        <select className="rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500">
          <option>📅 Tất cả thời gian</option>
          <option>📅 30 ngày qua</option>
          <option>📅 3 tháng qua</option>
          <option>📅 6 tháng qua</option>
          <option>📅 1 năm qua</option>
        </select>
      </div>
    </section>
  );
};

export default OrderSearchAndFilter;
