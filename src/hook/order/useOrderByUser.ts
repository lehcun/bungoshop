import { useQuery } from '@tanstack/react-query';

export const getUserOrder = async (status?: string, search?: string) => {
  // 1. Dùng URLSearchParams để build query động
  const params = new URLSearchParams();

  // 2. Chỉ thêm status vào URL nếu nó tồn tại VÀ không phải là 'all'
  if (status && status !== 'all') {
    params.append('status', status);
  }

  // 3. Chỉ thêm search vào URL nếu người dùng có gõ chữ
  if (search) {
    params.append('search', search);
  }

  // Nối params vào URL (nếu params rỗng thì queryString sẽ là chuỗi rỗng)
  const queryString = params.toString();
  const url = `${process.env.NEXT_PUBLIC_API_URL}/orders/user/history${queryString ? `?${queryString}` : ''}`;

  const res = await fetch(url, {
    cache: 'no-store', // Nằm ngoài headers nhé
    credentials: 'include',
  });

  if (!res.ok) throw new Error('Failed to fetch user history');

  return res.json();
};

export function useOrderByUser(status?: string, search?: string) {
  const query = useQuery({
    queryKey: ['orders', 'user', status, search],
    queryFn: () => getUserOrder(status, search),
  });
  return {
    orders: query.data || [],
    loading: query.isLoading,
    error: query.isError,
    refetch: query.refetch,
  };
}
