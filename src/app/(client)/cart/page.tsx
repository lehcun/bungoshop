import NavPath from '@/components/NavPath';
import CartModel from '@/components/product/CartModel';

export default async function CartPage() {
  return (
    <div className="bg-gray-50">
      <NavPath path="Giỏ hàng" />
      <CartModel />
    </div>
  );
}
