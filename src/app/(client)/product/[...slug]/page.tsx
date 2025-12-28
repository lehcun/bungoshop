import Container from '@/components/other/Container';
import NavPath from '@/components/ui/NavPath';
import ProductDisplay from '@/components/product/ProductDisplay';
import ReviewProduct from '@/components/product/ReviewProduct';

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  //Lay slug tu params
  const { slug } = await params;
  const productId = slug[0];

  return (
    <>
      <NavPath path="productDetail" />
      <div className="h-auto bg-gray-100">
        <Container className="flex flex-col gap-8 pb-8">
          <ProductDisplay productId={productId} />
          <ReviewProduct productId={productId} />
        </Container>
      </div>
    </>
  );
}
