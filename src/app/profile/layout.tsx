import '../globals.css';

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex flex-col">
      <main className="h-screen">{children}</main>
    </div>
  );
}
