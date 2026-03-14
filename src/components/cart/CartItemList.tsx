import { CartItem } from '@/models/Product';
import CartItemDetail from './CartItemDetail';

const CartItemList = ({
  carts,
  selectedItems,
  toggleSelect,
  toggleSelectAll,
}: {
  carts: CartItem[];
  selectedItems: CartItem[];
  toggleSelect: (item: CartItem) => void;
  toggleSelectAll: () => void;
}) => {
  const totalQuantity = carts?.reduce(
    (sum: number, item: CartItem) => sum + item.quantity,
    0
  );

  return (
    <div className="lg:w-2/3">
      <div className="bg-shop_bg rounded-2xl shadow-lg shadow-black/10">
        {/* Title */}
        <div className="from-shop_light_blue to-shop_dark_blue flex items-center justify-between rounded-t-2xl bg-gradient-to-r p-6 text-white">
          <div className="relative">
            <input
              type="checkbox"
              onChange={() => toggleSelectAll()}
              checked={selectedItems.length === carts?.length}
              className="absolute top-1 left-1.5 h-5 w-5 cursor-pointer accent-blue-500"
            />
            <span className="ml-10 text-xl font-semibold">
              Sản phẩm trong giỏ
            </span>
          </div>
          <span className="bg-shop_bg/20 rounded-2xl px-2 py-1 text-sm">
            {totalQuantity} sản phẩm
          </span>
        </div>
        {/* List Item */}
        {carts?.map((item: CartItem) => {
          return (
            <div
              key={item.id}
              className="flex justify-between border-t-1 border-gray-300 p-8"
            >
              <CartItemDetail
                item={item}
                selectedItems={selectedItems}
                toggleSelect={toggleSelect}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CartItemList;
