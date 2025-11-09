export default function FavouriteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex flex-col">
      <main className="h-auto">{children}</main>
    </div>
  );
}
