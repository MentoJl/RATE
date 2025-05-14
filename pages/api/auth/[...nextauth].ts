import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectToMongo } from "@/server/db"
import UsersSchema from '@/server/models/User'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        await connectToMongo()
        const user = await UsersSchema.findOne({ email: credentials?.email })
        if (!user) throw new Error("Invalid email or username")

        if (!credentials?.password === user.password) throw new Error("Invalid password")

        return {
          id: user._id.toString(),
          email: user?.email,
          name: user?.name,
          password: user.password,
          role: user?.role
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user
      return token
    },
    async session({ session, token }) {
      if (token?.user) {
        session.user = {
          ...token.user,
        }
      }
      return session
    }
  },
  pages: {
    signIn: "/login"
  }
})

export default handler

