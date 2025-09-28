import React from 'react';
import Logo from '../Logo';
import Container from '../Container';
import Link from 'next/link';

const LoginTop = () => {
  return (
    <Container className="py-5">
      <div className="flex items-center justify-between">
        <div className="flex">
          <Logo />
          <h2 className="ml-4 text-2xl">Đăng nhập</h2>
        </div>
        <Link
          href={'/login'}
          className="cursor-pointer text-blue-500 hover:opacity-70"
        >
          Bạn cần giúp đỡ?
        </Link>
      </div>
    </Container>
  );
};

export default LoginTop;
