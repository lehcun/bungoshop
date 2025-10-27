export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sideBarItems = [
    { name: 'Tổng Quan', iconUrl: '📊', url: '/dashboard/overview' },
    { name: 'Quản Lý Người dùng', iconUrl: '👥', url: '/dashboard/' },
    { name: 'Quản Lý Sản Phẩm', iconUrl: '🛍️', url: '/dashboard/' },
    { name: 'Quản lý Đơn hàng', iconUrl: '📦', url: '/dashboard/' },
    { name: 'Thống kê', iconUrl: '📈', url: '/dashboard/' },
    { name: 'Cài đặt', iconUrl: '⚙️', url: '/dashboard/' },
  ];
  return (
    <div className="mx-auto flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-1/4">
        <section className="border-b-1 border-gray-200 p-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <label>Quản trị viên</label>
        </section>
        <section className="h-screen py-4">
          {sideBarItems.map((sidebarItem) => (
            <div
              key={sidebarItem.name}
              className="trasition mx-4 cursor-pointer rounded-xl p-4 duration-200 ease-out hover:translate-x-1.5 hover:bg-blue-100"
            >
              <span className="mr-1 text-xl">{sidebarItem.iconUrl}</span>
              <span>{sidebarItem.name}</span>
            </div>
          ))}
        </section>
      </aside>
      <main className="w-3/4 bg-gray-100">
        <div>{children}</div>
      </main>
    </div>
  );
}
