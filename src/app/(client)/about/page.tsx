import Container from '@/components/other/Container';

export default async function AboutPage() {
  return (
    <Container className="flex flex-col space-y-8 bg-white py-28 text-xl">
      <h1 className="text-4xl font-semibold">🛒 Giới Thiệu về BungoShop</h1>
      <p>
        BungoShop là một công ty công nghệ tiên tiến, chuyên cung cấp các giải
        pháp sáng tạo cho các doanh nghiệp hiện đại.
      </p>
      <p>
        Đội ngũ chuyên gia gồm các nhà phát triển, nhà thiết kế và chuyên viên
        chiến lược của chúng tôi làm việc không ngừng nghỉ để tạo ra các giải
        pháp tùy chỉnh giúp khách hàng tinh giản hóa quy trình vận hành, tăng
        cường hiệu quả và thúc đẩy tăng trưởng.
      </p>
      <p>
        Tại BungoShop, chúng tôi tin tưởng vào sức mạnh của công nghệ để chuyển
        đổi doanh nghiệp và cải thiện cuộc sống. Chúng tôi cam kết luôn đi đầu
        trong các tiến bộ công nghệ và mang lại giá trị vượt trội cho khách hàng
        của mình.
      </p>
    </Container>
  );
}
