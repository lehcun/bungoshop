import Container from '@/components/other/Container';
import Button from '@/components/ui/Button';
import Image from 'next/image';

export default async function CheckoutSuccessPage() {
  return (
    <Container className="my-10 flex flex-col items-center gap-y-8">
      <div>
        <Image
          src={
            'https://res.cloudinary.com/dbvlsf9bi/image/upload/v1770012545/check-mark_ccfnqe.png'
          }
          alt="product-img"
          className="rounded-t-2xl object-cover"
          sizes="100%"
          width={80}
          height={0}
        />
      </div>
      <h2 className="text-2xl font-semibold">Thanh toán thành công</h2>
      {/* Sửa lại href trong tương lai cho chi tiết đơn hàng */}
      <Button href="/user/order" variant="outline">
        Xem đơn hàng của bạn
      </Button>
    </Container>
  );
}
