import Container from '@/components/Container';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ProfileSideBar from '@/components/profile/ProfileSideBar';
import UserInformation from '@/components/profile/UserInformation';

export default async function ProfilePage() {
  return (
    <>
      <Header />
      <div className="h-auto bg-gray-100">
        <Container className="flex gap-8 py-8">
          <ProfileSideBar />
          <UserInformation />
        </Container>
      </div>
      <Footer />
    </>
  );
}
