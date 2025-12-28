import Container from '@/components/other/Container';
import OrderDetail from '@/components/profile/OrderDetail';
import Image from 'next/image';

export default async function OrderPage() {
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
          <OrderDetail />
        </Container>
      </div>
    </>
  );
}
