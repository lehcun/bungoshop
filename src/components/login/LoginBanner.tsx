import React from 'react';
import Container from '../Container';
import Image from 'next/image';
import { banner1 } from '@/images';
import LoginPanel from './LoginPanel';

const LoginBanner = () => {
  return (
    <section className="bg-shop_banner">
      <Container className="flex justify-center space-x-8">
        <Image src={banner1} alt="banner1" width={600} height={1} />
        <LoginPanel />
      </Container>
    </section>
  );
};

export default LoginBanner;
