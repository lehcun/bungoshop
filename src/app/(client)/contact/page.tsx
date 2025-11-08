import Container from '@/components/Container';

export default async function ContactPage() {
  return (
    <Container className="items-center space-y-8 bg-white py-28 text-xl">
      <div className="text-center">
        <h1 className="text-4xl font-semibold">Liên Hệ Với Chúng Tôi</h1>
        <label>Chúng tôi luôn sẵn sàng hỗ trợ bạn</label>
      </div>
      <div className="grid grid-cols-2 space-x-4">
        <div className="space-y-8">
          <div className="flex items-start space-x-4 rounded-2xl bg-blue-50 p-6">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
              <span className="text-xl text-white">📧</span>
            </div>
            <div>
              <h3 className="mb-1 font-bold text-gray-900">Email</h3>
              <p id="contact-email" className="text-gray-600">
                contact@fashionhub.vn
              </p>
              <p className="mt-1 text-sm text-gray-500">Phản hồi trong 24h</p>
            </div>
          </div>
          <div className="flex items-start space-x-4 rounded-2xl bg-green-50 p-6">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-500">
              <span className="text-xl text-white">📱</span>
            </div>
            <div>
              <h3 className="mb-1 font-bold text-gray-900">Hotline</h3>
              <p id="contact-email" className="text-gray-600">
                1900-1234
              </p>
              <p className="mt-1 text-sm text-gray-500">Hỗ trợ 24/7</p>
            </div>
          </div>
          <div className="flex items-start space-x-4 rounded-2xl bg-violet-50 p-6">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-violet-500">
              <span className="text-xl text-white">📍</span>
            </div>
            <div>
              <h3 className="mb-1 font-bold text-gray-900">Địa Chỉ</h3>
              <p id="contact-email" className="text-gray-600">
                123 Đường ABC, Quận 1, TP.HCM
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Thứ 2 - Chủ Nhật: 8:00 - 22:00
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4 rounded-2xl bg-orange-50 p-6">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-orange-500">
              <span className="text-xl text-white">💬</span>
            </div>
            <div>
              <h3 className="mb-1 font-bold text-gray-900">
                Chat trực tuyến với tư vấn viên
              </h3>
              <p id="contact-email" className="text-gray-600">
                contact@fashionhub.vn
              </p>
              <p className="mt-1 text-sm text-orange-500">Bắt đầu chat →</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 p-8">
          <h3 className="mb-6 text-2xl font-bold text-gray-900">
            Gửi Tin Nhắn
          </h3>
          <form className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Họ và tên
              </label>{' '}
              <input
                type="text"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                placeholder="Nguyễn Văn A"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email
              </label>{' '}
              <input
                type="email"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Số điện thoại
              </label>{' '}
              <input
                type="tel"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                placeholder="0901234567"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Nội dung
              </label>{' '}
              <textarea
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập nội dung tin nhắn..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 py-3 font-semibold text-white transition hover:from-blue-600 hover:to-purple-700"
            >
              📤 Gửi Tin Nhắn
            </button>
          </form>
        </div>
      </div>
    </Container>
  );
}
