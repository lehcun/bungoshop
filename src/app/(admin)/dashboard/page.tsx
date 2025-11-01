'use client';

import { formatCurrency } from '@/lib/utils';
import { Order } from '@/models/User';
import { useEffect, useMemo, useState } from 'react';

export default function DashboardOverview() {
  const [currentMonthOrders, setCurrentMonthOrders] = useState<Order[]>([]);
  const [previousMonthOrders, setPreviousMonthOrders] = useState<Order[]>([]);

  const fetchMonthlyRevenues = async (month: number) => {
    const previousMonth = month === 12 ? 1 : month - 1;
    try {
      //Fetch lấy dữ liệu cho tháng vùa rồi
      const currentMonthRes = await fetch(
        `http://localhost:3001/orders/month/${month}`
      );
      if (!currentMonthRes.ok) throw new Error('Can not call orders/month');
      const currentData: Order[] = await currentMonthRes.json();
      setCurrentMonthOrders(currentData);

      //Fetch lấy dữ liệu cho tháng trước nữa
      const previousMonthRes = await fetch(
        `http://localhost:3001/orders/month/${previousMonth}`
      );
      if (!previousMonthRes.ok) throw new Error('Can not call orders/month');
      const previousData: Order[] = await previousMonthRes.json();
      setPreviousMonthOrders(previousData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const currMonth = new Date().getMonth() + 1;
    fetchMonthlyRevenues(currMonth);
  }, []);

  const currMonthlyRevenue = useMemo(() => {
    return currentMonthOrders.reduce((acc, curr) => acc + curr.totalPrice, 0);
  }, [currentMonthOrders]);

  const preMonthlyRevenue = useMemo(() => {
    return previousMonthOrders.reduce((acc, curr) => acc + curr.totalPrice, 0);
  }, [previousMonthOrders]);

  const momGrowth = useMemo(() => {
    if (currentMonthOrders === null || previousMonthOrders === null) {
      return 0;
    }
    return ((currMonthlyRevenue - preMonthlyRevenue) / preMonthlyRevenue) * 100;
  }, [
    currMonthlyRevenue,
    preMonthlyRevenue,
    currentMonthOrders,
    previousMonthOrders,
  ]);

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
                {formatCurrency(currMonthlyRevenue)}
              </span>
              {momGrowth > 0 ? (
                <span className="text-sm text-green-500">
                  ↗ {momGrowth.toFixed(1)}% so với tháng trước
                </span>
              ) : (
                <span className="text-sm text-red-500">
                  ↗ {momGrowth.toFixed(1)}% so với tháng trước
                </span>
              )}
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
