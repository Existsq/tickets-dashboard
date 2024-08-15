import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import axios from "axios";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.AUTH_DISCORD_ID,
      clientSecret: process.env.AUTH_DISCORD_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // Срок действия JWT (30 дней)
  },
  debug: true,
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, account, profile }) {
      // При первом входе пользователя сохраняем данные и токены
      if (account && profile) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires = Date.now() + account.expires_in * 1000; // Время истечения access token

        token.email = profile.email;
        token.nickname = profile.username; // Discord profile username
        token.guilds = profile.guilds;
      }

      console.log(token);

      // Если access token не истек, возвращаем токен
      if (Date.now() < token.accessTokenExpires) {
        // console.log(token);
        return token;
      }

      // Если access token истек, обновляем его
      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      if (token.error === "RefreshAccessTokenError") {
        // Если произошла ошибка обновления токена, перенаправляем на страницу входа
        return {
          ...session,
          error: "Authentication error, please login again.",
          redirect: "/auth/login",
        };
      }

      session.user.id = token.sub as string; // Используем sub как уникальный идентификатор
      session.user.email = token.email as string;
      session.user.name = token.nickname as string;

      session.accessToken = token.accessToken;
      console.log(session);

      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  cookies: {
    sessionToken: {
      name: `authjs.session-token`,
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 30 * 24 * 60 * 60, // Время жизни куки (30 дней)
      },
    },
    csrfToken: {
      name: `csrf-token`,
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      },
    },
  },
});

// Функция для обновления access token
async function refreshAccessToken(token) {
  try {
    const response = await axios.post(
      "https://discord.com/api/oauth2/token",
      null,
      {
        params: {
          client_id: process.env.DISCORD_CLIENT_ID,
          client_secret: process.env.DISCORD_CLIENT_SECRET,
          grant_type: "refresh_token",
          refresh_token: token.refreshToken,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const refreshedTokens = response.data;

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Обновляем только если есть новый refresh token
    };
  } catch (error) {
    console.error("Ошибка обновления токена", error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
