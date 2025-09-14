import React from 'react';
import Logo from './Logo';
import Link from 'next/link';
import { FacebookIcon, GithubIcon, YoutubeIcon } from 'lucide-react';
import {
  footerProducts,
  footerSupports,
  footerContacts,
} from '../../constants/data';
import Container from './Container';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-400">
      <Container>
        <div className="my-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex w-60 flex-col space-y-4">
            <Logo />
            <p>
              Nền tảng thương mại điện tử hàng đầu chuyên về công nghệ tại Việt
              Nam
            </p>
            <div className="flex space-x-4">
              <Link
                href={'/'}
                className="hover:text-shop_light_blue rounded-full border-1 p-1.5"
              >
                <YoutubeIcon />
              </Link>
              <Link
                href={'/'}
                className="hover:text-shop_light_blue rounded-full border-1 p-1.5"
              >
                <GithubIcon />
              </Link>
              <Link
                href={'/'}
                className="hover:text-shop_light_blue rounded-full border-1 p-1.5"
              >
                <FacebookIcon />
              </Link>
            </div>
          </div>
          <div className="flex w-60 flex-col space-y-4">
            <h2 className="text-xl text-white">Sản phẩm</h2>
            {footerProducts.map((product) => (
              <Link
                key={product.title}
                href={product.href}
                className="hover:text-gray-100"
              >
                {product.title}
              </Link>
            ))}
          </div>
          <div className="flex w-60 flex-col space-y-4">
            <h2 className="text-xl text-white">Hỗ trợ</h2>
            {footerSupports.map((support) => (
              <Link
                key={support.title}
                href={support.href}
                className="hover:text-gray-100"
              >
                {support.title}
              </Link>
            ))}
          </div>
          <div className="flex w-60 flex-col space-y-4">
            <h2 className="text-xl text-white">Liên hệ</h2>
            {footerContacts.map((contact) => (
              <div key={contact.title} className="flex items-center space-x-2">
                <div>{contact.icon}</div>
                <p>{contact.title}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center border-t-1 border-gray-700 py-4">
          <p>© 2025 BungoShop. Bản quyền của C .</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
