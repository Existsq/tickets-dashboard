import { NextResponse, NextRequest } from "next/server";
import { getToken } from "@auth/core/jwt";

const adminEmails = ["makswow7@gmail.com"];

export async function middleware(req: NextRequest) {
  // Получаем токен из запроса
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  const url = req.nextUrl.clone();
  const protectedPaths = ["/dashboard", "/admin"];
  const publicPaths = ["/sign-in"];

  // Если запрос идет на защищенный путь
  if (protectedPaths.some((path) => url.pathname.startsWith(path))) {
    // Если токен отсутствует, перенаправляем на страницу логина
    if (!token) {
      url.pathname = "/sign-in";
      return NextResponse.redirect(url);
    }

    // Если пользователь авторизован и пытается перейти на логин или главную панель
    if (url.pathname === "/sign-in" || url.pathname === "/dashboard") {
      if (adminEmails.includes(token.email)) {
        url.pathname = "/sales";
      } else {
        url.pathname = "/analytics";
      }
      return NextResponse.redirect(url);
    }
  }

  // Если запрос идет на публичный путь и пользователь авторизован
  if (publicPaths.some((path) => url.pathname.startsWith(path))) {
    if (token) {
      if (adminEmails.includes(token.email)) {
        url.pathname = "/sales";
      } else {
        url.pathname = "/analytics";
      }
      return NextResponse.redirect(url);
    }
  }

  // Для всех остальных случаев продолжаем запрос
  return NextResponse.next();
}

// Конфигурация для применения middleware только к определенным путям
export const config = {
  matcher: ["/profile/:path*", "/sign-in"],
};
