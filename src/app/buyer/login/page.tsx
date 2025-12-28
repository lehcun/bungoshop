import Container from '@/components/other/Container';
import LoginFooter from '@/components/auth/LoginFooter';
import LoginPanel from '@/components/auth/LoginPanel';
import LoginTop from '@/components/auth/LoginTop';
import { banner1 } from '@/images';
import Image from 'next/image';

export default async function LoginLayout() {
  return (
    <div>
      <LoginTop isLogin={true} />
      <div>
        <section className="bg-shop_banner">
          <Container className="flex justify-center space-x-8">
            <Image src={banner1} alt="banner1" width={600} height={1} />
            <LoginPanel />
          </Container>
        </section>
      </div>
      <LoginFooter />
    </div>
  );
}
