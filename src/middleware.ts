import { JWTPayload, jwtVerify } from 'jose';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Danh sách route cần bảo vệ
const adminPaths = ['/dashboard'];
const buyerPaths = ['/cart', '/favourite', '/user'];

interface CustomJWTPayload extends JWTPayload {
  role?: string;
  // Thêm các trường khác như id, email, ...
}
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('access_token')?.value; // Lấy token từ cookie
  const SECRET_KEY = process.env.SECRET_KEY;

  //Kiểm tra biến môi trường
  if (!SECRET_KEY) {
    console.error(
      'CRITICAL: Thiếu biến môi trường SECRET_KEY trong middleware'
    );
    return NextResponse.next(); // Tránh crash toàn bộ web, để backend tự lo khâu Auth
  }

  let verifiedRole: string | undefined;

  //Xác thực nếu có tokens
  if (token) {
    try {
      const secret = new TextEncoder().encode(SECRET_KEY);
      const { payload } = await jwtVerify(token, secret);
      const decodedPayload = payload as CustomJWTPayload;
      verifiedRole = decodedPayload.role;
    } catch (error) {
      // Bắt lỗi Token hết hạn (JWTExpired) hoặc không hợp lệ
      console.error(
        'Xác minh JWT thất bại (Token hết hạn/không hợp lệ):',
        error
      );

      // FIX LỖI XÓA COOKIE: Chỉ tạo 1 response duy nhất
      const redirectPath = adminPaths.some((p) => pathname.startsWith(p))
        ? '/admin/login'
        : '/buyer/login';

      const response = NextResponse.redirect(new URL(redirectPath, req.url));
      response.cookies.delete('access_token'); // Xóa sạch token cũ

      return response;
    }
  }

  // ADMIN PATH
  if (adminPaths.some((path) => pathname.startsWith(path))) {
    if (!token || verifiedRole !== 'ADMIN') {
      const url = req.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
  }

  // BUYER PATH
  if (buyerPaths.some((path) => pathname.startsWith(path))) {
    // Với buyer, chỉ cần có token hợp lệ (đã được verify ở trên) là vào được
    if (!token) {
      return NextResponse.redirect(new URL('/buyer/login', req.url));
    }
  }

  // PUBLIC PATH (Các route không nằm trong matcher sẽ tự động pass qua đây)
  return NextResponse.next();
}

// Áp dụng middleware
export const config = {
  matcher: ['/dashboard/:path*', '/cart', '/favourite', '/user/:path*'],
};
