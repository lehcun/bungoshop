import { User } from './User';

export interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;

  products: Product[];
}

export interface Brand {
  id: number;
  name: string;
  logoUrl: string | null;
  description: string | null;
  website: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: number;
  url: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Variant {
  id: number;
  productId: string;
  size: string | null;
  color: string | null;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
  comment: string;
  productId: string;
  userId: string;

  user: User;
  variant: Variant;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  discount: number;
  status: 'NEW' | 'HOT' | 'BEST' | null;
  brandId: number | null;
  categoryId: number;
  createdAt: string;
  updatedAt: string;

  // relations
  category: Category;
  brand: Brand | null;
  images: ProductImage[];
  variants: Variant[];
  reviews: Review[];
}
