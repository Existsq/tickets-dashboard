import { NextResponse } from "next/server";
import fetch from "node-fetch";
import { generateRandomToken } from "@/lib/auth"; // Функция генерации токена
import prisma from "@/utils/prisma"

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code || typeof code !== "string") {
    console.error("Invalid or missing code");
    return NextResponse.json({ error: "Invalid code" }, { status: 400 });
  }

  try {
    // Обмен кода на токены
    const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: "1264239380000936067",
        client_secret: "Ywdd0tmvO3dUd5r1hEhPejlLHvWgvcol",
        grant_type: "authorization_code",
        code: code,
        redirect_uri: "http://localhost:3000/api/auth/callback", // Убедитесь, что это правильный URI
      }),
    });

    // Преобразование ответа в JSON
    const tokenData: any = await tokenResponse.json();

    // Проверка, что tokenData содержит access_token
    if (!tokenData || typeof tokenData.access_token !== "string") {
      console.error("Failed to get access token:", tokenData);
      return NextResponse.json(
        { error: "Authorization failed" },
        { status: 401 }
      );
    }

    // Получаем информацию о пользователе
    const userResponse = await fetch("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    // Преобразование ответа в JSON
    const discordUser: any = await userResponse.json();

    // Проверка, что discordUser содержит необходимые поля
    if (
      !discordUser ||
      typeof discordUser.id !== "string" ||
      typeof discordUser.username !== "string"
    ) {
      console.error("Failed to get user information:", discordUser);
      return NextResponse.json(
        { error: "Failed to get user information" },
        { status: 500 }
      );
    }

    // Проверяем наличие пользователя в базе данных
    let user = await prisma.user.findUnique({
      where: { discordId: discordUser.id },
    });

    if (!user) {
      // Создаём нового пользователя
      user = await prisma.user.create({
        data: {
          discordId: discordUser.id,
          username: discordUser.username,
          email: discordUser.email || "",
          accessToken: tokenData.access_token,
          refreshToken: tokenData.refresh_token,
        },
      });
    } else {
      // Обновляем токены существующего пользователя
      user = await prisma.user.update({
        where: { discordId: discordUser.id },
        data: {
          accessToken: tokenData.access_token,
          refreshToken: tokenData.refresh_token,
        },
      });
    }

    // Создаём сессию
    const sessionToken = generateRandomToken();
    await prisma.session.create({
      data: {
        userId: user.id,
        sessionToken: sessionToken,
        expires: new Date(Date.now() + 3600 * 1000), // 1 час
      },
    });

    // Устанавливаем куки и выполняем редирект
    const response = NextResponse.redirect(
      new URL("/servers", request.url).toString()
    );

    response.cookies.set("session", sessionToken, {
      httpOnly: true,
      path: "/",
      maxAge: 3600, // 1 час
    });

    return response;
  } catch (error) {
    console.error("Error during callback handling:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
