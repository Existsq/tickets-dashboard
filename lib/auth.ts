import { NextRequest } from "next/server";
import { randomBytes } from "crypto";
import prisma from "@/utils/prisma";

export async function verifySession(request: NextRequest) {
  const sessionTokenCookie = request.cookies.get("session");

  // Проверяем, существует ли cookie сессии и извлекаем его значение
  const sessionToken = sessionTokenCookie?.value;

  if (!sessionToken) {
    return null; // Нет токена сессии, сессия не найдена
  }

  try {
    const session = await prisma.session.findUnique({
      where: { sessionToken: sessionToken }, // Здесь используется строка, а не RequestCookie
      cacheStrategy: { ttl: 60 },
    });

    if (!session || session.expires < new Date()) {
      // Если сессия не найдена или истекла, удаляем старую запись
      if (session) {
        await prisma.session.delete({
          where: { sessionToken: sessionToken },
        });
      }
      return null; // Сессия недействительна
    }

    // Сессия действительна, возвращаем информацию о пользователе
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      cacheStrategy: { ttl: 60 },
    });

    return user; // Возвращаем пользователя, связанного с действительной сессией
  } catch (error) {
    console.error("Error verifying session:", error);
    return null;
  }
}

export function generateRandomToken(): string {
  return randomBytes(32).toString("hex");
}
