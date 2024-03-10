import { nanoid } from 'nanoid'
import { AuthOptions, Awaitable } from 'next-auth'
import { getServerSession } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

import prismadb from '@/lib/prismadb'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prismadb),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        name: { label: 'name', type: 'text' },
        email: { label: 'email', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.name) {
          throw new Error('Invalid credentials')
        }

        const user = await prismadb.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        if (!user || user.name !== credentials.name) {
          throw new Error('Invalid credentials')
        }

        return user
      },
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
  pages: {
    signIn: '/sign-in',
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    session({ token, session }) {
      if (token && session.user) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
        session.user.username = token.username
      }

      return session
    },

    async jwt({ token, user }) {
      const dbUser = await prismadb.user.findFirst({
        where: {
          email: token.email,
        },
      })

      if (!dbUser) {
        token.id = user.id
        return token
      }

      if (!dbUser.username) {
        await prismadb.user.update({
          where: {
            id: dbUser.id,
          },
          data: {
            username: nanoid(10),
          },
        })
      }

      return {
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        id: dbUser.id,
        username: dbUser.username,
      } as Awaitable<JWT>
    },
    redirect() {
      return '/deliver'
    },
   
    
  },
}

export const getUserAuth = async () => await getServerSession(authOptions)
