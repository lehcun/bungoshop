import Container from '@/components/other/Container';
import FavouriteProductList from '@/components/product/FavouriteProductList';

export default async function FavoritePage() {
  return (
    <Container className="flex flex-col space-y-8 bg-white py-8">
      <FavouriteProductList />
    </Container>
  );
}
