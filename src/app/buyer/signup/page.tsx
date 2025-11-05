import Container from '@/components/Container';
import LoginFooter from '@/components/login/LoginFooter';
import LoginTop from '@/components/login/LoginTop';
import SignUpPanel from '@/components/login/SignUpPanel';
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
