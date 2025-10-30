import { CartItem, Favorite, Review } from './Product';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  password: string;
  role: string;
  avatarUrl: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;

  // relations
  cart: CartItem[];
  orders: Order[];
  reviews: Review[];
  favorites: Favorite[];
  // addresses: Address[];
  // payments: Payment[];
}

export interface Order {
  id: string;
  userId?: string | null;
  user?: User | null;
  status:
    | 'PENDING'
    | 'PAID'
    | 'SHIPPED'
    | 'COMPLETED'
    | 'CANCELED'
    | 'REFUNDED'
    | null;
  subtotal: number;
  shippingFee: number;
  discountAmount?: number | null;
  total: number;
  promotionCode?: string | null;
  shippingAddressId?: number | null;
  // shippingAddress?: Address | null;
  // paymentMethod?: PaymentMethod | null;
  createdAt: string;
  updatedAt: string;
}
