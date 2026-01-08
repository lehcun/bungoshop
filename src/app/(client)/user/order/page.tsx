import OrderDetail from '@/components/profile/OrderDetail';
import OrderItemList from '@/components/profile/OrderItemList';
import OrderSearchAndFilter from '@/components/profile/OrderSearchAndFilter';

export default async function OrderPage() {
  return (
    <div className="space-y-4">
      <div className="bg-white px-8 shadow-sm">
        <section className="flex h-20 items-center justify-between border-b-1 border-gray-300 py-4">
          <h3 className="text-xl font-semibold">Đơn hàng của tôi</h3>
        </section>
        <OrderDetail />
      </div>
      {/* Tim kiem & Loc */}
      <OrderSearchAndFilter />

      {/* Danh sach don hang */}
      <OrderItemList />
    </div>
  );
}
