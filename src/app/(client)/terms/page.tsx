import Container from '@/components/other/Container';

export default async function TermPage() {
  return (
    <Container className="bg-shop_bg flex flex-col space-y-8 py-28 text-xl">
      <h1 className="text-4xl font-semibold">📜 Điều Khoản và Điều Kiện</h1>
      <div>
        <h2 className="text-2xl font-semibold">1. Chấp Thuận Điều Khoản</h2>
        <p>
          Bằng việc truy cập và sử dụng các dịch vụ của BungoShop, bạn đồng ý bị
          ràng buộc bởi các Điều khoản và Điều kiện này.
        </p>
      </div>
      <div>
        <h2 className="text-2xl font-semibold">2. Sử Dụng Dịch Vụ</h2>
        <p>
          Bạn đồng ý chỉ sử dụng các dịch vụ của BungoShop cho các mục đích hợp
          pháp và tuân thủ theo các Điều khoản và Điều kiện này.
        </p>
      </div>
      <div>
        <h2 className="text-2xl font-semibold">3. Sở Hữu Trí Tuệ</h2>
        <p>
          Tất cả nội dung và tài liệu có sẵn trên các dịch vụ của BungoShop là
          tài sản của BungoShop và được bảo vệ bởi luật sở hữu trí tuệ hiện
          hành.
        </p>
      </div>
      <div>
        <h2 className="text-2xl font-semibold">4. Giới Hạn Trách Nhiệm</h2>
        <p>
          BungoShop sẽ không chịu trách nhiệm đối với bất kỳ thiệt hại gián
          tiếp, ngẫu nhiên, đặc biệt, do hậu quả hoặc mang tính trừng phạt nào
          phát sinh từ việc bạn sử dụng dịch vụ của chúng tôi.
        </p>
      </div>
      <div>
        <h2 className="text-2xl font-semibold">5. Luật Điều Chỉnh</h2>
        <p>
          Các Điều khoản và Điều kiện này sẽ được điều chỉnh và giải thích theo
          luật pháp của khu vực tài phán nơi BungoShop hoạt động.
        </p>
      </div>
    </Container>
  );
}
