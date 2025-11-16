import { JWTPayload, jwtVerify } from 'jose';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Danh sách route cần bảo vệ
const adminPaths = ['/dashboard'];
const buyerPaths = ['/cart', '/favourite'];

interface CustomJWTPayload extends JWTPayload {
  role?: string;
  // Thêm các trường khác như id, email, ...
}
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get('access_token')?.value; // Lấy token từ cookie
  const SECRET_KEY = process.env.SECRET_KEY;

  let verifiedRole: string | undefined;
  if (token) {
    const secret = new TextEncoder().encode(SECRET_KEY); // Mã hóa SECRET_KEY
    let decodedPayload: CustomJWTPayload | null = null;

    //Xác minh và trích xuất Role từ Token
    try {
      const { payload } = await jwtVerify(token, secret);
      decodedPayload = payload as CustomJWTPayload;
      verifiedRole = decodedPayload.role; // <-- Lấy role đã được xác minh!
    } catch (error) {
      // Bắt lỗi Token hết hạn (JWTExpired) hoặc không hợp lệ
      console.error(
        'Xác minh JWT thất bại (Token hết hạn/không hợp lệ):',
        error
      );

      // Xóa cookie token đã hết hạn (tùy chọn)
      const response = NextResponse.redirect(new URL('/login', req.url));
      response.cookies.delete('access_token');

      // Chuyển hướng về trang đăng nhập tùy theo khu vực đang truy cập
      const redirectPath = adminPaths.some((p) => pathname.startsWith(p))
        ? '/admin/login'
        : '/buyer/login';
      return NextResponse.redirect(new URL(redirectPath, req.url));
    }
  }

  // =========================================
  // ADMIN PATH
  // =========================================
  if (adminPaths.some((path) => pathname.startsWith(path))) {
    if (!token || verifiedRole !== 'ADMIN') {
      const url = req.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
  }

  // =========================================
  // BUYER PATH
  // =========================================
  if (buyerPaths.some((path) => pathname.startsWith(path))) {
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = '/buyer/login';
      return NextResponse.redirect(url);
    }
  }

  // =========================================
  // CLIENT PATH
  // PUBLIC → không kiểm tra
  // =========================================
  return NextResponse.next();
}

// Áp dụng middleware cho toàn bộ app
export const config = {
  matcher: ['/dashboard/:path*', '/cart', '/favourite'],
};
