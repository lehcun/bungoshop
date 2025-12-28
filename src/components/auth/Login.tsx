import Link from 'next/link';
import React from 'react';

const Login = () => {
  return (
    <Link
      href={'/buyer/login'}
      className="hover:text-shop_dark_blue m-auto text-gray-600"
    >
      Login
    </Link>
  );
};

export default Login;
