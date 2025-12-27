'use client';

import { formatCurrency } from '@/lib/utils';
import { useOrderGrowth } from '@/hook/order/useOrderByMonth';
import { useAllProduct } from '@/hook/products/useAllProduct';
import { useProductByMonth } from '@/hook/products/useProductByMonth';
import { useUsers } from '@/hook/useUsers';
import { useUsersByMonth } from '@/hook/useUsersByMonth';

export default function DashboardOverview() {
  const { orderMonthlyResult } = useOrderGrowth();
  const { products } = useAllProduct();
  const { productsByMonth } = useProductByMonth();
  const { users } = useUsers();
  const { usersByMonth } = useUsersByMonth();

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
                {formatCurrency(orderMonthlyResult?.revenueGrowth)}
              </span>
              {orderMonthlyResult?.momGrowth > 0 ? (
                <span className="text-sm text-green-500">
                  ↗ {orderMonthlyResult?.momGrowth.toFixed(1)}% so với tháng
                  trước
                </span>
              ) : (
                <span className="text-sm text-red-500">
                  ↗ {orderMonthlyResult?.momGrowth.toFixed(1)}% so với tháng
                  trước
                </span>
              )}
            </div>
            <span className="text-4xl">💰</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-white p-4">
            <div className="flex flex-col gap-y-2">
              <span className="text-gray-600">Đơn hàng</span>
              <span className="text-3xl font-bold text-green-700">
                {orderMonthlyResult?.totalOrder}
              </span>
              <span className="text-sm text-green-500">
                ↗ +{orderMonthlyResult?.currMonthlyCount} đơn hàng
              </span>
            </div>
            <span className="text-4xl">📦</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-white p-4">
            <div className="flex flex-col gap-y-2">
              <span className="text-gray-600">Sản phẩm</span>
              <span className="text-3xl font-bold text-purple-500">
                {products.length}
              </span>
              <span className="text-sm text-blue-500">
                ↗ +{productsByMonth?.length} sản phẩm
              </span>
            </div>
            <span className="text-4xl">🛍️</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-white p-4">
            <div className="flex flex-col gap-y-2">
              <span className="text-gray-600">Số người dùng</span>
              <span className="text-3xl font-bold text-orange-500">
                {users?.length}
              </span>
              <span className="text-sm text-green-500">
                ↗ +{usersByMonth?.length} khách hàng mới
              </span>
            </div>
            <span className="text-4xl">👥</span>
          </div>
        </div>
      </section>
    </>
  );
}
