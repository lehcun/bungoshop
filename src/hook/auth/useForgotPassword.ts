import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const forgotPasswordSendOtpApi = async (email: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password/send-otp`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    }
  );
  if (!res.ok)
    throw new Error(
      (await res.json()).message || 'Không thể gửi otp để đổi mật khẩu'
    );
  return res.json();
};

export const useForgotPasswordSendOtp = (onSuccessCallback: () => void) => {
  const mutation = useMutation({
    mutationFn: ({ email }: { email: string }) =>
      forgotPasswordSendOtpApi(email),
    onSuccess: (data) => {
      alert(data.message);
      onSuccessCallback(); // Gọi hàm đổi UI sang Bước 2
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  return { sendOtp: mutation.mutate, isPending: mutation.isPending };
};

// --- API ĐỔI MẬT KHẨU
const resetPasswordApi = async (
  email: string,
  code: string,
  password: string
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code, newPassword: password }),
    }
  );

  if (!res.ok) {
    throw new Error((await res.json()).message || 'Đổi mật khẩu thất bại');
  }
  return res.json();
};

export const useResetPassword = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: ({
      email,
      code,
      password,
    }: {
      email: string;
      code: string;
      password: string;
    }) => resetPasswordApi(email, code, password),
    onSuccess: (data) => {
      alert(data.message);
      router.push('/buyer/login');
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  return { resetPassword: mutation.mutate, isPending: mutation.isPending };
};
