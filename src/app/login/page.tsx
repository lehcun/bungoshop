import Footer from '@/components/Footer';
import LoginBanner from '@/components/login/LoginBanner';
import LoginTop from '@/components/login/LoginTop';

export default async function LoginLayout() {
  return (
    <div className="">
      <LoginTop />
      <div>
        <LoginBanner />
      </div>
      <Footer />
    </div>
  );
}
