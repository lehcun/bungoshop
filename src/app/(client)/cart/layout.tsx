import { CartProvider } from '@/contexts/CartContext';

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex flex-col">
      <main className="h-auto">
        <CartProvider>{children}</CartProvider>
      </main>
    </div>
  );
}
