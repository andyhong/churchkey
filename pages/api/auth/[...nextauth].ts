import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { InitOptions } from 'next-auth'
import Providers from 'next-auth/providers'
import { GenericObject } from 'next-auth/_utils'

const options: InitOptions = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    Providers.Twitter({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!
    }),
    Providers.Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!
    }),
  ],

  database: {
    type: "mongodb",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    url: process.env.MONGO_URI
  },

  session: {
    jwt: true,
    maxAge: 24 * 30 * 30,
  },

  jwt: {
    secret: process.env.JWT_SECRET,
  },

  pages: {
    signIn: '/login',
    error: '/login',
    newUser: '/onboarding/url'
  },

  callbacks: {
    jwt: async (token, user: GenericObject, account) => {
      if (user) {
        token.id = user.id
        token.provider = account.provider
      }
      return Promise.resolve(token)
    },
    session: async (session, user: GenericObject) => {
      return Promise.resolve({ ...session, id: user.id })
    }
  }
}

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options)
