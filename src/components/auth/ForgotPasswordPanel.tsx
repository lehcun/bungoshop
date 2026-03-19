'use client';

import {
  useForgotPasswordSendOtp,
  useResetPassword,
} from '@/hook/auth/useForgotPassword';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const ForgotPasswordPanel = () => {
  // UI State: 1 = Nhập Email, 2 = Nhập OTP & Mật khẩu mới
  const [step, setStep] = useState<1 | 2>(1);
  const [countdown, setCountdown] = useState(60);

  // Form State
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { sendOtp: sendForgotPasswordOtp, isPending: isSendingOtp } =
    useForgotPasswordSendOtp(() => {
      setStep(2);
      setCountdown(60);
      setErrorMsg(null);
    });

  const { resetPassword, isPending: isResetting } = useResetPassword();

  useEffect(() => {
    if (step === 2 && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [step, countdown]);

  // --- Handlers ---
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return setErrorMsg('Vui lòng nhập email');
    setErrorMsg(null);
    sendForgotPasswordOtp({ email });
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length !== 6) return setErrorMsg('Mã OTP phải gồm 6 chữ số');
    if (newPassword.length < 6)
      return setErrorMsg('Mật khẩu mới phải có ít nhất 6 ký tự');
    if (newPassword !== confirmPassword)
      return setErrorMsg('Mật khẩu xác nhận không khớp');

    setErrorMsg(null);
    // Gửi cả email, mã OTP và mật khẩu mới lên Backend
    resetPassword({ email, code: otpCode, password: newPassword });
  };

  const handleResendOtp = () => {
    sendForgotPasswordOtp({ email });
    setCountdown(60);
  };

  return (
    <div
      className={`bg-shop_bg my-8 rounded-md p-8 transition-all duration-300 ${
        step === 2 ? 'mx-auto max-w-lg' : 'mx-auto max-w-md'
      }`}
    >
      <h2 className="pb-8 text-center text-xl font-semibold">
        {step === 1 ? 'Quên Mật Khẩu' : 'Đặt Lại Mật Khẩu'}
      </h2>

      {/* Hiển thị lỗi chung (nếu có) */}
      {errorMsg && (
        <div className="mb-4 rounded bg-red-100 p-2 text-center text-sm text-red-600">
          {errorMsg}
        </div>
      )}

      {/* --- FORM 1: NHẬP EMAIL YÊU CẦU ĐỔI MẬT KHẨU --- */}
      {step === 1 && (
        <form onSubmit={handleEmailSubmit} className="flex flex-col space-y-6">
          <p className="mb-2 text-center text-sm text-gray-600">
            Vui lòng nhập địa chỉ email đã đăng ký. Chúng tôi sẽ gửi mã xác nhận
            để bạn đặt lại mật khẩu.
          </p>

          <input
            type="email"
            placeholder="Nhập email của bạn"
            className="focus:outline-shop_dark_blue w-full rounded border-1 border-gray-400 py-3 pl-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            disabled={isSendingOtp}
            className="bg-shop_dark_blue rounded py-3 text-lg text-white hover:opacity-80 disabled:opacity-50"
          >
            {isSendingOtp ? 'Đang gửi...' : 'Gửi mã xác nhận'}
          </button>

          <div className="mt-6 border-t border-gray-200 pt-4 text-center">
            <Link
              href={'/buyer/login'}
              className="text-shop_dark_blue hover:underline"
            >
              &larr; Quay lại đăng nhập
            </Link>
          </div>
        </form>
      )}

      {/* --- FORM 2: NHẬP MÃ OTP & MẬT KHẨU MỚI --- */}
      {step === 2 && (
        <form onSubmit={handleResetSubmit} className="flex flex-col space-y-5">
          <p className="text-center text-sm text-gray-600">
            Mã gồm 6 chữ số đã được gửi tới <b>{email}</b>
          </p>

          <input
            type="text"
            placeholder="Mã xác nhận (6 số)"
            maxLength={6}
            className="focus:border-shop_dark_blue w-full rounded border-1 border-gray-400 py-2 pl-3 text-center text-xl tracking-[0.3em] focus:outline-none"
            value={otpCode}
            onChange={(e) => setOtpCode(e.target.value)}
          />

          <input
            type="password"
            placeholder="Mật khẩu mới"
            className="focus:outline-shop_dark_blue w-full rounded border-1 border-gray-400 py-2 pl-3"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Xác nhận mật khẩu mới"
            className="focus:outline-shop_dark_blue w-full rounded border-1 border-gray-400 py-2 pl-3"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={isResetting}
            className="bg-shop_dark_blue mt-2 rounded py-3 text-lg text-white hover:opacity-80 disabled:opacity-50"
          >
            {isResetting ? 'Đang cập nhật...' : 'Đổi Mật Khẩu'}
          </button>

          <div className="flex flex-col items-center space-y-3 pt-4 text-sm">
            <p className="flex gap-1 text-gray-500">
              Chưa nhận được mã?
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={isSendingOtp || countdown > 0}
                className={`font-semibold ${
                  countdown > 0 || isSendingOtp
                    ? 'cursor-not-allowed text-gray-400'
                    : 'text-shop_dark_blue hover:underline'
                }`}
              >
                {isSendingOtp
                  ? 'Đang gửi...'
                  : countdown > 0
                    ? `Gửi lại sau ${countdown}s`
                    : 'Gửi lại mã'}
              </button>
            </p>

            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-gray-500 hover:text-gray-700 hover:underline"
            >
              &larr; Đổi email khác
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ForgotPasswordPanel;
