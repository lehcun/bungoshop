import AskedDetail from '@/components/other/AskedDetail';
import Container from '@/components/other/Container';

export default async function FaqsPage() {
  return (
    <Container className="mx-auto py-10">
      <h2 className="mb-6 py-10 text-5xl font-semibold">
        Các câu hỏi thường gặp
      </h2>
      <AskedDetail />
    </Container>
  );
}
