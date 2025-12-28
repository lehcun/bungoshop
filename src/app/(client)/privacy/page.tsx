import Container from '@/components/other/Container';

export default async function PrivacyPage() {
  return (
    <Container className="flex flex-col space-y-8 bg-white py-28 text-xl">
      <h1 className="text-4xl font-semibold">🔒 Chính Sách Quyền Riêng Tư</h1>
      <div>
        <h2 className="text-2xl font-semibold">1. Thu Thập Thông Tin</h2>
        <p>
          Chúng tôi thu thập thông tin mà bạn cung cấp trực tiếp cho chúng tôi
          khi sử dụng dịch vụ, cũng như thông tin về việc sử dụng dịch vụ của
          bạn.
        </p>
      </div>
      <div>
        <h2 className="text-2xl font-semibold">2. Sử Dụng Thông Tin</h2>
        <p>
          Chúng tôi sử dụng thông tin thu thập được để cung cấp, duy trì và cải
          thiện dịch vụ của mình, cũng như để liên lạc với bạn.
        </p>
      </div>
      <div>
        <h2 className="text-2xl font-semibold">3. Chia Sẻ Thông Tin</h2>
        <p>
          Chúng tôi không chia sẻ thông tin cá nhân của bạn với bên thứ ba,
          ngoại trừ các trường hợp được mô tả trong Chính sách Quyền riêng tư
          này hoặc khi có sự đồng ý của bạn.
        </p>
      </div>
      <div>
        <h2 className="text-2xl font-semibold">4. Bảo Mật Dữ Liệu</h2>
        <p>
          Chúng tôi áp dụng các biện pháp hợp lý để giúp bảo vệ thông tin cá
          nhân của bạn khỏi bị mất mát, đánh cắp, sử dụng sai mục đích và truy
          cập trái phép.
        </p>
      </div>
      <div>
        <h2 className="text-2xl font-semibold">5. Quyền của Bạn</h2>
        <p>
          Bạn có quyền truy cập, chỉnh sửa hoặc xóa thông tin cá nhân của mình.
          Vui lòng liên hệ với chúng tôi để được hỗ trợ về các yêu cầu này.
        </p>
      </div>
    </Container>
  );
}
