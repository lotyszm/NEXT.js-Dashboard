'use server';

import { db } from '@/db';
import { users, verificationTokens } from '@/db/schema/user';
import { sendMail } from '@/lib/mail/mailService';
import { randomString } from '@/lib/utils';
import { hash } from 'bcrypt';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

if (!process.env.APP_BASE_URL) throw new Error('APP_BASE_URL not set');

export async function registerUserAction(prevState: any, _formData: FormData) {
  const username = _formData.get('username');
  const password = _formData.get('password');

  // Check if user exists
  const userExists = await db
    .select()
    .from(users)
    .where(eq(users.email, username?.toString() as string));

  if (userExists.length > 0) {
    return {
      message: 'User with this e-mail already exists',
    };
  }

  const hashedPassword = await hash(password?.toString() as string, 10);

  const insertUser = {
    id: crypto.randomUUID(),
    name: username?.toString() as string,
    email: username?.toString() as string,
    emailVerified: null,
    image: null,
    password: hashedPassword,
  } satisfies typeof users.$inferInsert;

  const user = await db.insert(users).values([insertUser]).returning();

  const token = randomString(32);

  const verificationToken = await db.insert(verificationTokens).values([
    {
      identifier: user[0].email,
      token: token,
      expires: new Date(Date.now() + 86400 * 1000),
    },
  ]);

  const verificationUrl = `${process.env.APP_BASE_URL}/confirm-account?token=${token}&email=${user[0].email}`;

  await sendMail({
    subject: 'Register new account',
    toEmail: user[0].email,
    otpText: `Please click the link below to verify your e-mail address <br /><a href="${verificationUrl}">${verificationUrl}</a>`,
  });

  redirect('/email-sent?type=register');
  return {
    message: null,
  };
}
