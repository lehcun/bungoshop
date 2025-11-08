import React from 'react';
import Logo from './Logo';
import Link from 'next/link';
import { FacebookIcon, GithubIcon, YoutubeIcon } from 'lucide-react';
import { footerSupports, footerContacts } from '../constants/data';
import Container from './Container';

const Footer = () => {
  const categories = [''];
  const quickLink = [
    { name: 'About us', href: '/about' },
    { name: 'Contact us', href: '/contact' },
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'FAQs', href: '/faqs' },
    { name: 'Help', href: '/help' },
  ];
  return (
    <footer className="bg-gray-800 py-4 text-gray-400">
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
            {/* {categories.map((product) => (
              <Link
                key={product.name}
                href={product.href}
                className="hover:text-gray-100"
              >
                {product.name}
              </Link>
            ))} */}
          </div>
          <div className="flex w-60 flex-col space-y-4">
            <h2 className="text-xl text-white">Hỗ trợ</h2>
            {quickLink.map((support) => (
              <Link
                key={support.name}
                href={support.href}
                className="hover:text-gray-100"
              >
                {support.name}
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
