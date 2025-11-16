import AddProductForm from '@/components/dashboard/ProductForm/AddProductForm';

export default function addProduct() {
  return (
    <>
      <div className="from-shop_dark_blue to-shop_light_blue flex flex-col items-center space-y-2 bg-gradient-to-br py-8 text-white">
        <div className="py-2">
          <span className="rounded-full bg-gray-200 p-2 text-5xl">📦</span>
        </div>
        <h2 className="text-3xl">Quản Lý Sản Phẩm</h2>
        <p className="text-xl">Thêm sản phẩm mới vào hệ thống</p>
      </div>
      {/* Form nhập dữ liệu */}
      <div className="mx-auto my-10 max-w-7xl px-4">
        <AddProductForm />
      </div>
    </>
  );
}
