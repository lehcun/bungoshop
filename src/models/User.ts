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
  addresses: Address[];
  // payments: Payment[];
}

export interface Order {
  id: string;
  userId?: string | null;
  status:
    | 'PENDING'
    | 'PAID'
    | 'SHIPPED'
    | 'COMPLETED'
    | 'CANCELED'
    | 'REFUNDED'
    | null;
  discountPrice?: number | null;
  shippingFeePrice: number;
  subtotalPrice: number;
  totalPrice: number;
  promotionCode?: string | null;
  shippingAddressId?: number | null;
  // shippingAddress?: Address | null;
  // paymentMethod?: PaymentMethod | null;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  id: string;
  userId: string;
  label?: string;
  recipient: string;
  phone: string;
  line1: string;
  line2?: string | null;
  city: string;
  state?: string;
  postalCode?: string;
  country: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}
