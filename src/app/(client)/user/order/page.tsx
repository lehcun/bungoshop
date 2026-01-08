import OrderDetail from '@/components/profile/OrderDetail';
import Button from '@/components/ui/Button';
import Image from 'next/image';

export default async function OrderPage() {
  return (
    <>
      <div className="bg-white px-8 shadow-sm">
        <section className="flex h-20 items-center justify-between border-b-1 border-gray-300 py-4">
          <h3 className="text-xl font-semibold">Đơn hàng của tôi</h3>
          <Button className="rounded-md">Thêm địa chỉ mới</Button>
        </section>
        <OrderDetail />
      </div>
    </>
  );
}
