import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from "../../../lib/mongodb"

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    adapter: MongoDBAdapter(clientPromise),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!
      }),
      // Providers.Twitter({
      //   clientId: process.env.TWITTER_CLIENT_ID!,
      //   clientSecret: process.env.TWITTER_CLIENT_SECRET!
      // }),
      // Providers.Facebook({
      //   clientId: process.env.FACEBOOK_CLIENT_ID!,
      //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET!
      // }),
    ],
  
    // database: {
    //   type: "mongodb",
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   url: process.env.MONGO_URI
    // },
  
    session: {
      strategy: "jwt",
      maxAge: 24 * 30 * 30,
    },
  
    secret: process.env.JWT_SECRET,
  
    jwt: {
      secret: process.env.JWT_SECRET,
    },
  
    pages: {
      signIn: '/login',
      error: '/login',
      newUser: '/onboarding/url'
    },
  
    callbacks: {
      async jwt({ token, user, account }) {
        if (user) {
          token.id = user.id
          token.provider = account.provider
        }
        return token
      },
      async session({ session, token }) {
        return session
      }
    }
  })
}