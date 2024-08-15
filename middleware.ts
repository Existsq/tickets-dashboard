import { NextResponse, NextRequest } from "next/server";
import { getToken } from "@auth/core/jwt";

// Middleware функция
export async function middleware(req: NextRequest) {
  // Получаем токен из запроса
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  const url = req.nextUrl.clone();
  const protectedPaths = ["/dashboard", "/profile"];
  const publicPaths = ["/auth/login", "/public"];

  // Проверяем защищенные пути
  if (protectedPaths.some((path) => url.pathname.startsWith(path))) {
    if (!token) {
      url.pathname = "/auth/login";
      return NextResponse.redirect(url);
    }
  }

  // Проверяем общедоступные пути
  if (publicPaths.some((path) => url.pathname.startsWith(path))) {
    if (token && url.pathname === "/auth/login") {
      url.pathname = "/dashboard/analytics";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Конфигурация для применения middleware только к определенным путям
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/auth/login",
    "/public/:path*",
  ],
};
