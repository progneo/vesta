import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface User {
    firstName: string
    lastName: string
    roleId: number
    isActive: boolean
  }

  interface Session {
    user: User & {
      firstName: string
      lastName: string
      roleId: number
      isActive: boolean
    } & DefaultSession['user']
    token: {
      firstName: string
      lastName: string
      roleId: number
      isActive: boolean
    }
  }
}
