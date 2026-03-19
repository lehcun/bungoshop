'use client';

import { FacebookIcon, GoogleIcon } from '@/images';
import Image from 'next/image';
import {
  useResendOtp,
  useSignUp,
  useVerifyRegister,
} from '@/hook/auth/useSignUp';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const SignUpPanel = () => {
  //UI State
  const [step, setStep] = useState<1 | 2>(1);
  const [countdown, setCountdown] = useState(60); // State cho bộ đếm 60s

  //Form State
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');

  const [serverError, setServerError] = useState<
    'username' | 'email' | 'password' | null
  >(null);

  // Hooks
  const { signUp, isPending: isSignUpPending } = useSignUp(() => {
    // Khi API signUp thành công, chuyển sang bước 2
    setStep(2);
  });
  const { verify, isPending: isVerifyPending } = useVerifyRegister();
  const { resend, isPending: isResendPending } = useResendOtp();

  // Handlers
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email || !password)
      return alert('Vui lòng điền đủ thông tin');
    signUp({ name: username, email, password });
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length !== 6) return alert('Mã OTP phải gồm 6 chữ số');
    verify({ email, code: otpCode });
  };

  const handleResendOtp = () => {
    resend({ email });
    setCountdown(60); // Reset lại bộ đếm
  };

  // --- LOGIC ĐẾM NGƯỢC 60S VỀ 0S ---
  useEffect(() => {
    // Chỉ đếm ngược khi đang ở bước 2 và countdown còn lớn hơn 0
    if (step === 2 && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      // Dọn dẹp timer để tránh rò rỉ bộ nhớ
      return () => clearTimeout(timer);
    }
  }, [step, countdown]);

  return (
    <div
      className={`bg-shop_bg my-8 rounded-md p-8 transition-all duration-300 ${
        step === 2 ? 'mx-auto max-w-lg' : 'w-auto'
      }`}
    >
      <h2 className="pb-8 text-xl font-semibold">
        {step === 1 ? 'Đăng ký tài khoản' : 'Xác nhận Email'}
      </h2>
      {/* --- FORM 1: NHẬP THÔNG TIN --- */}
      {step === 1 && (
        <form
          onSubmit={handleRegisterSubmit}
          className="flex flex-col space-y-8"
        >
          <input
            type="text"
            placeholder="Tên người dùng"
            className="w-100 border-1 border-gray-400 py-2 pl-3"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <div className="relative">
            {serverError === 'email' && (
              <span className="absolute -top-5 text-amber-600">
                Email đã tồn tại
              </span>
            )}
            <input
              type="email"
              placeholder="Email"
              className={`${serverError === 'email' ? 'focus:amber-600 border-amber-600' : 'border-gray-400'} w-100 border-1 py-2 pl-3`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            {serverError === 'username' && (
              <span className="absolute -top-5 text-amber-600">
                Mật khẩu phải có ít nhất 6 ký tự
              </span>
            )}
            <input
              type="password"
              placeholder="Mật khẩu"
              className={`${serverError === 'username' ? 'focus:amber-600 border-amber-600' : 'border-gray-400'} w-100 border-1 py-2 pl-3`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={isSignUpPending}
            className="bg-shop_dark_blue rounded-sm py-2 text-xl text-white hover:opacity-80 disabled:opacity-50"
          >
            {isSignUpPending ? 'Đang gửi mã...' : 'Đăng ký'}
          </button>
        </form>
      )}

      {/* --- FORM 2: NHẬP MÃ OTP --- */}
      {step === 2 && (
        <form onSubmit={handleOtpSubmit} className="flex flex-col space-y-6">
          <p className="text-gray-600">
            Mã xác nhận gồm 6 chữ số đã được gửi tới email <b>{email}</b>. Mã có
            hiệu lực trong 5 phút.
          </p>

          <input
            type="text"
            placeholder="Nhập mã xác nhận (6 số)"
            maxLength={6}
            className="w-full border-1 border-gray-400 py-2 pl-3 text-center text-lg tracking-widest"
            value={otpCode}
            onChange={(e) => setOtpCode(e.target.value)}
          />

          <button
            type="submit"
            disabled={isVerifyPending}
            className="bg-shop_dark_blue rounded-sm py-2 text-xl text-white hover:opacity-80 disabled:opacity-50"
          >
            {isVerifyPending ? 'Đang kiểm tra...' : 'Xác nhận mã'}
          </button>

          <div className="flex flex-col items-center space-y-3 pt-4 text-sm">
            <p className="flex gap-1 text-gray-500">
              Chưa nhận được mã?
              <button
                type="button"
                onClick={handleResendOtp}
                // Nút sẽ bị khóa nếu đang gửi API HOẶC thời gian đếm ngược vẫn còn (> 0)
                disabled={isResendPending || countdown > 0}
                className={`font-semibold ${
                  countdown > 0 || isResendPending
                    ? 'cursor-not-allowed text-gray-400'
                    : 'text-shop_dark_blue hover:underline'
                }`}
              >
                {isResendPending
                  ? 'Đang gửi...'
                  : countdown > 0
                    ? `Gửi lại sau ${countdown}s` // Sẽ hiển thị: 60s, 59s... 1s
                    : 'Gửi lại mã'}
              </button>
            </p>

            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-gray-500 hover:text-gray-700 hover:underline"
            >
              &larr; Quay lại sửa thông tin
            </button>
          </div>
        </form>
      )}

      {/* FOOTER (Social Login & Link to Login) */}
      {step === 1 && (
        <>
          <div className="my-8 flex justify-between border-t-1 border-gray-300 py-6">
            <Link
              href={'/login'}
              className="flex w-48 items-center justify-center gap-x-2 border-1 border-gray-400 p-1.5 hover:opacity-70"
            >
              <Image src={FacebookIcon} alt="face" width={25} />
              Facebook
            </Link>
            <Link
              href={'/login'}
              className="flex w-48 items-center justify-center gap-x-2 border-1 border-gray-400 p-1.5 hover:opacity-70"
            >
              <Image src={GoogleIcon} alt="face" width={25} />
              Google
            </Link>
          </div>
          <div className="flex justify-center">
            <p>Bạn đã có tài khoản?</p>
            <Link
              href={'/buyer/login'}
              className="text-shop_dark_blue cursor-pointer hover:opacity-90"
            >
              Đăng nhập
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default SignUpPanel;
