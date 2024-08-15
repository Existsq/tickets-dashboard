import NextAuth from "next-auth"
import Discord from "next-auth/providers/discord"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Discord({authorization: {params: {scope: "indentify guilds email"}}})],
  callbacks: {
    jwt({ token, user }) {
      if (user) { // User is available during sign-in
        token.id = user.id
        token.email = user.email
        token.name = user.name
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.id as string
      session.user.email = token.email as string
      session.user.name = token.name as string
      return session
    },
  },
  pages: {
    signIn: "/auth/login"
  }
})