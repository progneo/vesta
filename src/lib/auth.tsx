import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { db } from '@/lib/db'
import { NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_URL,
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/signin'
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'username', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        const existingUser = await db.user.findUnique({
          where: { username: credentials?.username }
        })
        if (!existingUser) {
          return null
        }

        // const passwordMatch = await compare(
        //   credentials.password,
        //   existingUser.password
        // )
        const passwordMatch = credentials.password === existingUser.password

        if (!passwordMatch) {
          return null
        }

        if (!passwordMatch) {
          return null
        }

        return {
          id: `${existingUser.id}`,
          username: existingUser.username,
          roleId: existingUser.roleId,
          isActive: existingUser.isActive
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.roleId
        token.firstName = user.firstName
        token.lastName = user.lastName
        return {
          ...token
        }
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          roleId: token.role,
          firstName: token.firstName,
          lastName: token.lastName
        }
      }
    }
  }
}
