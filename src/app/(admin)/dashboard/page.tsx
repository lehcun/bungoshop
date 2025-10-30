export default function DashboardOverview() {
  return (
    <>
      <header className="flex justify-between px-8 py-4">
        <div>
          <h1 className="text-2xl font-bold">Tổng quan</h1>
          <p className="text-gray-500">Xem tổng quan về cửa hàng</p>
        </div>
      </header>
      <section>
        <div className="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center justify-between rounded-2xl bg-white p-4">
            <div className="flex flex-col gap-y-2">
              <span className="text-gray-600">Tổng doanh thu</span>
              <span className="text-shop_dark_blue text-3xl font-bold">
                2.4 triệu đ
              </span>
              <span className="text-sm text-green-500">
                ↗ +12.5% so với tháng trước
              </span>
            </div>
            <span className="text-4xl">💰</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-white p-4">
            <div className="flex flex-col gap-y-2">
              <span className="text-gray-600">Đơn hàng</span>
              <span className="text-3xl font-bold text-green-700">1247</span>
              <span className="text-sm text-green-500">
                ↗ +8.2% so với tháng trước
              </span>
            </div>
            <span className="text-4xl">📦</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-white p-4">
            <div className="flex flex-col gap-y-2">
              <span className="text-gray-600">Sản phẩm</span>
              <span className="text-3xl font-bold text-purple-500">759</span>
              <span className="text-sm text-blue-500">↗ +15 sản phẩm</span>
            </div>
            <span className="text-4xl">🛍️</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-white p-4">
            <div className="flex flex-col gap-y-2">
              <span className="text-gray-600">Tổng doanh thu</span>
              <span className="text-3xl font-bold text-orange-500">12,456</span>
              <span className="text-sm text-green-500">
                ↗ +234 khách hàng mới
              </span>
            </div>
            <span className="text-4xl">👥</span>
          </div>
        </div>
      </section>
    </>
  );
}
