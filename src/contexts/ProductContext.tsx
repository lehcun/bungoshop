'use client';

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Product, Review } from '@/models/Product';

interface ProductContextType {
  product: Product | null;
  reviews: Review[];
  loading: boolean;
  setProductId: (id: string) => void;
  refetch: () => void;
}

const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [productId, setProductId] = useState<string | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async (id: string) => {
    try {
      setLoading(true);
      const [productRes, reviewRes] = await Promise.all([
        fetch(`http://localhost:3001/products/${id}`),
        fetch(`http://localhost:3001/reviews/${id}`),
      ]);
      const [productData, reviewData] = await Promise.all([
        productRes.json(),
        reviewRes.json(),
      ]);
      setProduct(productData);
      setReviews(reviewData);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    if (productId) fetchData(productId);
  };

  useEffect(() => {
    if (productId) fetchData(productId);
  }, [productId]);

  return (
    <ProductContext.Provider
      value={{ product, reviews, loading, setProductId, refetch }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context)
    throw new Error('useProductContext must be used inside ProductProvider');
  return context;
};
