import CartItemList from '@/components/product/CartItemList';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';

const CartModel = () => {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <CartItemList />
          {/* <CartSummary /> */}
        </CartProvider>
      </AuthProvider>
    </>
  );
};

export default CartModel;
