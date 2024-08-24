// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";

// Публичные маршруты и API маршруты
const PUBLIC_PATHS = ["/sign-in", "/api/auth/callback"];
const PUBLIC_API_PATHS = ["/api/auth/callback"];

export async function middleware(request: NextRequest) {
  const url = new URL(request.url);

  // Публичные маршруты, которые не требуют аутентификации
  if (
    PUBLIC_PATHS.includes(url.pathname) ||
    PUBLIC_API_PATHS.some((path) => url.pathname.startsWith(path))
  ) {
    // Проверка сессии для страницы входа
    if (url.pathname === "/sign-in") {
      const user = await verifySession(request);

      if (user) {
        // Пользователь уже аутентифицирован, перенаправляем на главную страницу или другую страницу
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
    return NextResponse.next();
  }

  // Проверка сессии для защищенных маршрутов
  const user = await verifySession(request);

  if (!user) {
    // Перенаправление на страницу логина, если сессия не найдена
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Если сессия действительна, продолжайте обработку запроса
  return NextResponse.next();
}

// Определение конфигурации для matcher
export const config = {
  matcher: [
    "/((?!api/auth/callback|_next/static|_next/image|favicon.ico).*)",
    "/api/:path*",
  ],
};
