import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "../globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen max-w-[1200px] mx-auto">
      <Header />
      <main className="">{children}</main>
      <Footer />
    </div>
  );
}
