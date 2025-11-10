import Container from '@/components/Container';
import NavPath from '@/components/NavPath';
import ProductDisplay from '@/components/product/ProductDisplay';
import ReviewProduct from '@/components/product/ReviewProduct';

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  //Lay slug tu params
  const { slug } = await params;

  return (
    <>
      <NavPath path="productDetail" />
      <div className="h-auto bg-gray-100">
        <Container className="flex flex-col gap-8 pb-8">
          <ProductDisplay productId={slug} />
          <ReviewProduct productId={slug} />
        </Container>
      </div>
    </>
  );
}
