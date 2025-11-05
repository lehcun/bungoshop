import Button from '@/components/common/Button';
import Container from '@/components/Container';
import Image from 'next/image';

export default async function OrderPage() {
  const filterOptions = [
    {
      icon: '📦',
      name: 'Tất cả',
      count: '47',
    },
    {
      icon: '⏳',
      name: 'Chờ xử lý',
      count: '3',
    },
    {
      icon: '🚚',
      name: 'Đang giao',
      count: '8',
    },
    {
      icon: '✅',
      name: 'Hoàn thành',
      count: '34',
    },
    {
      icon: '❌',
      name: 'Đã hủy',
      count: '2',
    },
  ];
  return (
    <>
      <div className="h-auto bg-gray-100">
        <Container className="space-y-4 py-8">
          {/* Tieu de */}
          <section className="mx-auto flex flex-col items-center space-y-2">
            <div className="from-shop_light_blue to-shop_dark_blue rounded-full bg-gradient-to-br p-5">
              <div className={`relative h-12 w-12`}>
                <Image
                  src={
                    'https://res.cloudinary.com/dbvlsf9bi/image/upload/v1762347592/checklist_aeznpi.png'
                  }
                  alt={`Order Img`}
                  layout="fill"
                  objectFit="contain"
                  loading="lazy"
                  quality={75}
                />
              </div>
            </div>
            <h1 className="text-3xl font-semibold">Lịch sử đơn hàng</h1>
            <p className="text-lg text-gray-500">
              Xin chào! Đây là lịch sử mua hàng của bạn
            </p>
          </section>
          {/* Thong tin nguoi dung */}
          <section className="flex space-x-4 rounded-2xl bg-white p-4 shadow-md shadow-black/10">
            <div className={`relative h-18 w-18 overflow-hidden rounded-full`}>
              <Image
                src={
                  'https://res.cloudinary.com/dbvlsf9bi/image/upload/v1759736844/BuAnCuopChibi_kpa9lb.png'
                }
                alt={`Order Img`}
                layout="fill"
                objectFit="contain"
                loading="lazy"
                quality={75}
              />
            </div>
            <div className="flex flex-1 flex-col">
              <h3>Nguyễn Văn An</h3>
              <span>📧 nguyen.van.an@email.com</span>
              <span>📱 0901234567</span>
            </div>
            <div className="flex space-x-4 text-center">
              <div>
                <div className="text-shop_dark_blue text-2xl font-semibold">
                  47
                </div>
                <span className="text-md text-gray-600">Tổng đơn</span>
              </div>
              <div>
                <div className="text-2xl font-semibold text-green-600">
                  12.5M
                </div>
                <span className="text-md text-gray-600">Tổng chi</span>
              </div>
              <div>
                <div className="text-2xl font-semibold text-violet-600">
                  2.5K
                </div>
                <span className="text-md text-gray-600">Điểm tích lũy</span>
              </div>
            </div>
          </section>
          {/* Tim kiem & Loc */}
          <section className="flex space-x-4 rounded-2xl bg-white p-4 shadow-md shadow-black/10">
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  className="space-x-1 rounded-lg bg-gray-200 p-2"
                >
                  <div>{item.icon}</div>
                  <div>
                    {item.name}({item.count})
                  </div>
                </Button>
              ))}
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="text"
                placeholder="🔍 Tìm kiếm đơn hàng..."
                className="w-64 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
              />
              <select className="rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500">
                <option>📅 Tất cả thời gian</option>
                <option>📅 30 ngày qua</option>
                <option>📅 3 tháng qua</option>
                <option>📅 6 tháng qua</option>
                <option>📅 1 năm qua</option>
              </select>
            </div>
          </section>
          <div>
            <section className="rounded-2xl bg-white p-4 shadow-md shadow-black/10">
              <div className="px-4">
                <div className="flex">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">Đơn hàng #DH001</h3>
                    <span className="text-gray-600">
                      Đặt ngày: 15/03/2024 - 14:30
                    </span>
                  </div>
                  <div className="flex flex-col text-right">
                    <label className="rounded-full bg-green-200 p-1 text-green-800">
                      ✅ Hoàn thành
                    </label>
                    <label className="text-xl font-semibold text-green-600">
                      1.250.000₫
                    </label>
                  </div>
                </div>
                <div className="border-b-1 border-gray-300 pb-4">
                  <h4 className="font-semibold">🛍️ Sản phẩm đã mua:</h4>
                  <div className="flex flex-col gap-1 rounded-2xl bg-gray-100 p-2">
                    <label className="text-lg">Váy Maxi Hoa Nhí </label>
                    <label className="text-gray-500">
                      Size M, Màu đỏ - SL: 1
                    </label>
                    <label className="text-shop_dark_blue font-semibold">
                      490.000₫
                    </label>
                  </div>
                </div>
                <div className="space-x-4 py-2">
                  <span className="cursor-pointer hover:opacity-70">
                    🔄 Mua lại
                  </span>
                  <span className="cursor-pointer hover:opacity-70">
                    ⭐ Đánh giá
                  </span>
                  <span className="cursor-pointer hover:opacity-70">
                    📄 Tải hóa đơn
                  </span>
                </div>
              </div>
            </section>
          </div>
          <section>chuyen traang</section>
        </Container>
      </div>
    </>
  );
}
