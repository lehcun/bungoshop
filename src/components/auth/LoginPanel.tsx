'use client';

import { useLogin } from '@/hook/auth/useLogin';
import { FacebookIcon, GoogleIcon } from '@/images';
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import Button from '../ui/Button';

const LoginPanel = () => {
  const passwordRef = useRef<HTMLInputElement>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useLogin(passwordRef as React.RefObject<HTMLInputElement>);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      login({ email, password });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="my-8 rounded-md bg-white p-8">
      <h2 className="pb-8 text-xl">Đăng nhập</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-8">
        <input
          type="text"
          placeholder="Email"
          className="w-100 border-1 border-gray-400 py-2 pl-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="relative">
          <input
            type="password"
            ref={passwordRef}
            placeholder="Password"
            className="w-100 border-1 border-gray-400 py-2 pl-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          variant="custom"
          disabled={!password || !email}
          className="bg-shop_dark_blue rounded-sm py-2 text-xl text-white hover:opacity-80 focus:ring-blue-500 disabled:bg-blue-200"
        >
          Login
        </Button>
      </form>
      <p className="my-2 cursor-pointer text-orange-300 hover:opacity-90">
        Quên mật khẩu
      </p>
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
        <p>Bạn chưa có tài khoản?</p>
        <Link
          href={'/buyer/signup'}
          className="text-shop_dark_blue cursor-pointer hover:opacity-90"
        >
          Đăng ký
        </Link>
      </div>
    </div>
  );
};

export default LoginPanel;
