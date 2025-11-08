import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0, // bo so le thap phan
  }).format(value);
}

export function formatOrderDate(isoDateString: string): string {
  try {
    // 1. Tạo đối tượng Date từ chuỗi ISO
    const date = new Date(isoDateString);

    // Kiểm tra xem đối tượng Date có hợp lệ không
    if (isNaN(date.getTime())) {
      console.error('Lỗi: Chuỗi ngày tháng không hợp lệ.');
      return 'Ngày không hợp lệ';
    }

    // 2. Định dạng ngày tháng (Date)
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = date.getFullYear();

    // 3. Định dạng giờ (Time)
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    // Tùy chọn: Sử dụng múi giờ cục bộ (local timezone) để hiển thị cho người dùng.
    // Nếu bạn muốn hiển thị theo UTC, hãy dùng getUTCHours(), getUTCMinutes(), v.v.

    // 4. Kết hợp lại: DD/MM/YYYY HH:mm:ss
    return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
  } catch (error) {
    console.error('Đã xảy ra lỗi trong quá trình định dạng ngày:', error);
    return 'Lỗi định dạng';
  }
}
