'use client';

import { FacebookIcon, GoogleIcon } from '@/images';
import Image from 'next/image';
import { useSignUp } from '@/hook/auth/useSignUp';
import Link from 'next/link';
import React, { useState } from 'react';

const SignUpPanel = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //Tạm tạm thôi từ từ sửa sau
  const [serverError, setServerError] = useState<
    'username' | 'email' | 'password' | null
  >(null);

  const { signUp } = useSignUp();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      signUp({ name: username, email, password });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="my-8 rounded-md bg-white p-8">
      <h2 className="pb-8 text-xl">Đăng ký</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-8">
        <input
          type="text"
          placeholder="Tên người dùng"
          className="w-100 border-1 border-gray-400 py-2 pl-3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className="relative">
          {serverError === 'email' ? (
            <span className="absolute -top-5 text-amber-600">
              Email đã tồn tại
            </span>
          ) : (
            <></>
          )}
          <input
            type="text"
            placeholder="Email"
            className={`${serverError === 'email' ? 'focus:amber-600 border-1 border-amber-600' : 'border-gray-400'} w-100 border-1 py-2 pl-3`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="relative">
          {serverError === 'username' ? (
            <span className="absolute -top-5 text-amber-600">
              Password phải có ít nhất 6 ký tự
            </span>
          ) : (
            <></>
          )}
          <input
            type="text"
            placeholder="Password"
            className={`${serverError === 'email' ? 'focus:amber-600 border-1 border-amber-600' : 'border-gray-400'} w-100 border-1 py-2 pl-3`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-shop_dark_blue rounded-sm py-2 text-xl text-white hover:opacity-80"
          onClick={handleSubmit}
        >
          Đăng ký
        </button>
      </form>
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
    </div>
  );
};

export default SignUpPanel;
