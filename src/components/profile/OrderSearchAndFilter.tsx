const OrderSearchAndFilter = ({
  activeStatus,
  setStatus,
  setSearchTerm,
}: {
  activeStatus: string;
  setStatus: (status: string) => void;
  setSearchTerm: (term: string) => void;
}) => {
  const filterOptions = [
    { icon: '📦', name: 'Tất cả', value: 'all' },
    { icon: '⏳', name: 'Chờ xử lý', value: 'pending' },
    { icon: '🚚', name: 'Đã giao', value: 'shipped' },
    { icon: '✅', name: 'Hoàn thành', value: 'completed' },
    { icon: '❌', name: 'Đã hủy', value: 'canceled' },
    { icon: '', name: 'Đã thanh toán', value: 'paid' },
    { icon: '', name: 'Đã hoàn tiền', value: 'refunded' },
  ];

  return (
    <section className="flex space-x-4 rounded-md bg-white p-4 shadow-md shadow-black/10">
      <div className="flex flex-1 flex-wrap gap-2">
        {filterOptions.map((item) => {
          const isActive = activeStatus === item.value;

          return (
            <button
              key={item.value}
              onClick={() => setStatus(item.value)}
              className={`flex cursor-pointer space-x-1 rounded-lg p-2 transition-all ${
                isActive
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </button>
          );
        })}
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
