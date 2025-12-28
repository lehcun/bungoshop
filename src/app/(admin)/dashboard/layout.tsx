import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sideBarItems = [
    { name: 'Tổng Quan', iconUrl: '📊', href: '/dashboard' },
    { name: 'Quản Lý Người dùng', iconUrl: '👥', href: '/dashboard/users' },
    { name: 'Quản Lý Sản Phẩm', iconUrl: '🛍️', href: '/dashboard/products' },
    { name: 'Quản lý Đơn hàng', iconUrl: '📦', href: '/dashboard/orders' },
    { name: 'Thống kê', iconUrl: '📈', href: '/dashboard/stats' },
    { name: 'Cài đặt', iconUrl: '⚙️', href: '/dashboard/setting' },
  ];
  return (
    <div className="mx-auto flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-1/4">
        <section className="border-b-1 border-gray-200 p-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <label>Quản trị viên</label>
        </section>
        <section className="flex h-screen flex-col py-4">
          {sideBarItems.map((sidebarItem) => (
            <Link
              href={sidebarItem.href}
              key={sidebarItem.name}
              className="trasition mx-4 cursor-pointer rounded-xl p-4 duration-200 ease-out hover:translate-x-1.5 hover:bg-blue-100"
            >
              <span className="mr-1 text-xl">{sidebarItem.iconUrl}</span>
              <span>{sidebarItem.name}</span>
            </Link>
          ))}
        </section>
        <section>
          {' '}
          <Button iconLeft="🚪" variant="danger">
            Đăng xuất
          </Button>
        </section>
      </aside>
      <main className="w-3/4 bg-gray-100">
        <div>{children}</div>
      </main>
    </div>
  );
}
