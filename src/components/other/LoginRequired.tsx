import React from 'react';
import Button from '../ui/Button';
import Logo from '../ui/Logo';

const LoginRequired = () => {
  return (
    <div className="my-40 flex flex-col items-center space-y-2 overflow-hidden rounded-2xl bg-white p-8 text-center shadow-md shadow-black/10">
      <Logo />
      <h1>Vui lòng đăng nhập để truy cập phần này</h1>
      <Button href="/buyer/login" className="w-60 rounded-md">
        Đăng nhập
      </Button>
      <span className="text-gray-500">Bạn chưa có tài khoản?</span>
      <Button
        href="/buyer/signup"
        className="w-60 rounded-md border-1 border-gray-300"
        variant="ghost"
      >
        Đăng ký tài khoản mới
      </Button>
    </div>
  );
};

export default LoginRequired;
