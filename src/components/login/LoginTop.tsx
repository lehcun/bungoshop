import React from 'react';
import Logo from '../ui/Logo';
import Container from '../Container';
import Link from 'next/link';

const LoginTop = ({ isLogin }: { isLogin: boolean }) => {
  return (
    <Container className="py-5">
      <div className="flex items-center justify-between">
        <div className="flex">
          <Logo />
          <h2 className="ml-4 text-2xl">{isLogin ? 'Đăng nhập' : 'Đăng ký'}</h2>
        </div>
        <Link
          href={'/contact'}
          className="cursor-pointer text-blue-500 hover:opacity-70"
        >
          Bạn cần giúp đỡ?
        </Link>
      </div>
    </Container>
  );
};

export default LoginTop;
