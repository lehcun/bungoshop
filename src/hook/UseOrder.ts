import { getUserOrder } from '@/services/orderService';
import { useQuery } from '@tanstack/react-query';

export function useOrder() {
  return useQuery({
    queryKey: ['orders'],
    queryFn: () => getUserOrder(),
  });
}
