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
        console.log("pass: ", credentials?.password)
        console.log("user pass: ", user.password)

        if (!credentials?.password === user.password) throw new Error("Invalid password")

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          isAdmin: user?.isAdmin
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user
      return token
    },
    async session({ session, token }) {
      session.user = token.user as { name?: string | null; email?: string | null; password?: string | null }
      return session
    }
  },
  pages: {
    signIn: "/login"
  }
})

export default handler

