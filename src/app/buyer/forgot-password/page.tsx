import Container from '@/components/other/Container';
import LoginTop from '@/components/auth/LoginTop';
import Footer from '@/components/layout/Footer';
import ForgotPasswordPanel from '@/components/auth/ForgotPasswordPanel';

export default async function ForgotPasswordLayout() {
  return (
    <>
      <LoginTop title={'Quên mật khẩu'} />
      <div>
        <section className="bg-shop_banner">
          <Container className="flex justify-center space-x-8">
            <ForgotPasswordPanel />
          </Container>
        </section>
      </div>
      <Footer />
    </>
  );
}
