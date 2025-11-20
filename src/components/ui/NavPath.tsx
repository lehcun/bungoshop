import React from 'react';
import Container from '../Container';
import Link from 'next/link';

const NavPath = ({ path }: { path: string }) => {
  return (
    <div className="bg-gray-100 py-4">
      <Container className="flex gap-x-3 text-sm">
        <Link href={'/'} className="hover:text-shop_dark_blue text-gray-600">
          Trang chủ
        </Link>
        <span>{`>`}</span>
        <span className="font-medium">{path}</span>
      </Container>
    </div>
  );
};

export default NavPath;
