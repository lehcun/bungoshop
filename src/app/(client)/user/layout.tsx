import Container from '@/components/other/Container';
import ProfileSideBar from '@/components/profile/ProfileSideBar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-gray-100">
      <Container className="flex gap-8 py-8">
        {/* Sidebar */}
        <div className="w-1/6">
          <ProfileSideBar />
        </div>

        {/* Main content for user/... */}
        <main className="w-5/6">
          <div>{children}</div>
        </main>
      </Container>
    </div>
  );
}
