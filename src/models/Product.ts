export interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
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
}
