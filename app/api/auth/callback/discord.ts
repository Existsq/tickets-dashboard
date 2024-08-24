import { NextResponse } from "next/server";
import fetch from "node-fetch";
import jwt from "jsonwebtoken";
import prisma from "@/utils/prisma";

// Интерфейс для ответа от Discord
interface DiscordTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  [key: string]: any; // Дополнительные поля
}

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
        client_id: process.env.DISCORD_CLIENT_ID!,
        client_secret: process.env.DISCORD_CLIENT_SECRET!,
        grant_type: "authorization_code",
        code: code,
        redirect_uri: process.env.DISCORD_REDIRECT_URI!,
      }),
    });

    // Преобразование ответа в JSON с приведением типа
    const tokenData = (await tokenResponse.json()) as DiscordTokenResponse;

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

    // Генерация JWT токена
    const jwtToken = jwt.sign(
      { userId: user.id, discordId: user.discordId },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    // Создаём сессию
    await prisma.session.create({
      data: {
        userId: user.id,
        sessionToken: jwtToken,
        expires: new Date(Date.now() + 3600 * 1000), // 1 час
      },
    });

    // Устанавливаем куки и выполняем редирект
    const response = NextResponse.redirect(
      new URL("/servers", request.url).toString()
    );

    response.cookies.set("session", jwtToken, {
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