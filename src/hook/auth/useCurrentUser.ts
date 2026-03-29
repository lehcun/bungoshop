import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useCurrentUser = () => {
  const query = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      // Dùng axios thay cho fetch, cực kỳ ổn định với Cookie
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
        {
          withCredentials: true, // <--- Lệnh bài thần thánh bắt buộc phải mang Cookie đi
        }
      );

      // Không cần check res.ok hay res.json() vì axios đã tự làm và tự quăng lỗi nếu tạch
      return res.data;
    },
    retry: false, // không cố gọi lại
    refetchOnWindowFocus: false, // Chuyển tab qua lại không tự gọi API nữa
  });

  return {
    user: query.data ?? null,
    loading: query.isLoading,
    error: query.isError,
    refetch: query.refetch,
  };
};
