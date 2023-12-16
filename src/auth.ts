import GithHubProvider from 'next-auth/providers/github';
import EmailProvider from 'next-auth/providers/email';
import Credentials from 'next-auth/providers/credentials';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@/db/index';
import { NextAuthOptions } from 'next-auth';

if (!process.env.APP_BASE_URL) throw new Error('APP_BASE_URL not set');

export const authOptions = {
  theme: {
    logo: `${process.env.APP_BASE_URL}/logo.svg`,
    brandColor: '#000',
    colorScheme: 'light',
  },
  adapter: DrizzleAdapter(db),
  providers: [
    Credentials({
      name: 'login',
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = { id: '1', name: 'J Smith', email: 'jsmith@example.com' };

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }

        // if (!credentials) {
        //   return null;
        // }
        // console.log(credentials);
        // return { id: "1", name: "J Smith", email: "jsmith@example.com" };
      },
    }),
    // EmailProvider({
    //   server: process.env.EMAIL_SERVER,
    //   from: process.env.EMAIL_FROM,
    // }),
    GithHubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
  ],
} satisfies NextAuthOptions;
