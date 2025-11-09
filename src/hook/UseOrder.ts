import { getUserOrder } from '@/services/orderService';
import { useQuery } from '@tanstack/react-query';

export function useOrder(token: string | null) {
  return useQuery({
    queryKey: ['orders'],
    queryFn: () => getUserOrder(token),
    enabled: !!token,
  });
}
