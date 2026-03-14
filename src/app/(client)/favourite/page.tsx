import Container from '@/components/other/Container';
import FavouriteProductList from '@/components/product/FavouriteProductList';

export default async function FavoritePage() {
  return (
    <Container className="bg-shop_bg flex flex-col space-y-8 py-8">
      <FavouriteProductList />
    </Container>
  );
}
