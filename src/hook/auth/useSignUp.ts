import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const signUpApi = async (name: string, email: string, password: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });
  if (!res.ok)
    throw new Error((await res.json()).message || 'Đăng ký thất bại');
  return res.json();
};

export const useSignUp = (onSuccessCallback: () => void) => {
  const mutation = useMutation({
    mutationFn: ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => signUpApi(name, email, password),
    onSuccess: (data) => {
      alert(data.message); // Hiển thị: "Vui lòng kiểm tra email..."
      onSuccessCallback(); // Gọi hàm đổi UI sang Bước 2
    },
    onError: (error) => {
      alert(error.message);
    },
  });
  return { signUp: mutation.mutate, isPending: mutation.isPending };
};

// --- BƯỚC 2: GỌI API XÁC NHẬN OTP & NHẬN COOKIE ---
const verifyOtpApi = async (email: string, code: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-register`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code }),
      credentials: 'include',
    }
  );
  if (!res.ok) throw new Error((await res.json()).message || 'Mã xác nhận sai');
  return res.json();
};

export const useVerifyRegister = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ email, code }: { email: string; code: string }) =>
      verifyOtpApi(email, code),
    onSuccess: (data) => {
      alert('Đăng ký và xác thực thành công!');
      // Lúc này backend đã trả về user, ta mới setQueryData và chuyển trang
      queryClient.setQueryData(['user'], data.user);
      router.push('/');
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  return { verify: mutation.mutate, isPending: mutation.isPending };
};

// --- API GỬI LẠI MÃ OTP ---
const resendOtpApi = async (email: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/resend-otp`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    }
  );
  if (!res.ok)
    throw new Error((await res.json()).message || 'Không thể gửi lại mã');
  return res.json();
};

export const useResendOtp = () => {
  const mutation = useMutation({
    mutationFn: ({ email }: { email: string }) => resendOtpApi(email),
    onSuccess: (data) => {
      alert(data.message);
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  return { resend: mutation.mutate, isPending: mutation.isPending };
};
