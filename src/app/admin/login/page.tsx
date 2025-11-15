import Container from '@/components/Container';
import AdminLoginPanel from '@/components/dashboard/AdminLoginPanel';

export default async function LoginLayout() {
  return (
    <div>
      <div>
        <section className="bg-shop_banner h-screen py-28">
          <Container className="flex justify-center space-x-8">
            <AdminLoginPanel />
          </Container>
        </section>
      </div>
    </div>
  );
}
