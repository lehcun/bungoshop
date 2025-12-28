import Container from '@/components/other/Container';
import LoginFooter from '@/components/auth/LoginFooter';
import LoginTop from '@/components/auth/LoginTop';
import SignUpPanel from '@/components/auth/SignUpPanel';
import { banner1 } from '@/images';
import Image from 'next/image';

export default async function LoginLayout() {
  return (
    <div>
      <LoginTop isLogin={false} />
      {/* <LoginBanner /> */}
      <section className="bg-shop_banner">
        <Container className="flex justify-center space-x-8">
          <Image src={banner1} alt="banner1" width={600} height={1} />
          <SignUpPanel />
        </Container>
      </section>
      <LoginFooter />
    </div>
  );
}
