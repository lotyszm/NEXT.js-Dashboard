import GithHubProvider from 'next-auth/providers/github';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@/db/index';
import { NextAuthOptions } from 'next-auth';
import { users } from '../db/schema/user';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { compare, hash } from 'bcrypt';
import Credentials from 'next-auth/providers/credentials';

if (!process.env.APP_BASE_URL) throw new Error('APP_BASE_URL not set');
if (!process.env.NEXTAUTH_SECRET) throw new Error('NEXTAUTH_SECRET not set');

export const authOptions = {
  pages: {
    signIn: '/signin',
    // signOut: '/auth/signout',
    // error: '/auth/error',
    verifyRequest: '/email-sent',
    // newUser: '/auth/new-user',
  },
  theme: {
    logo: `${process.env.APP_BASE_URL}/logo.svg`,
    brandColor: '#000',
    colorScheme: 'light',
  },
  // debug: true,
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
  adapter: DrizzleAdapter(db),
  providers: [
    Credentials({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        if (!credentials) {
          redirect('/');
          return null;
        }

        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials?.email as string));

        if (user.length === 0) {
          return null;
        }
        if (user[0].password === null) {
          // TODO: check if user use another provider !!
          return null;
        }

        // TODO: check if user is verified !!

        const passwordCorrect = await compare(
          credentials?.password || '',
          user[0].password
        );

        if (passwordCorrect) {
          return {
            ...user[0],
            username: user[0].email,
          };
        } else {
          return null;
        }
      },
    }),
    // EmailProvider({
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: process.env.EMAIL_SERVER_PORT,
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       pass: process.env.EMAIL_SERVER_PASSWORD,
    //     },
    //   },
    //   from: process.env.EMAIL_FROM,
    // }),
    GithHubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
  ],
} satisfies NextAuthOptions;
