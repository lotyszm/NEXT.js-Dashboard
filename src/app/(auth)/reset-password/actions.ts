'use server';

import { db } from '@/db';
import { resetPasswordsTokens, users } from '@/db/schema/user';
import { sendMail } from '@/lib/auth/mail/mailService';
import { isUserExist } from '@/lib/auth/utils';
import { randomString } from '@/lib/utils';
import { hash } from 'bcrypt';
import { and, eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

export async function resetPasswordAction(prevState: any, _formData: FormData) {
  const username = _formData.get('username');

  // Check if user exists
  const userExists = await isUserExist(username?.toString() as string);
  if (!userExists) {
    return {
      message: 'User with this e-mail does not exist',
    };
  }

  // generate new token and store it in db
  const token = randomString(32);
  const resetPasswordTokens = await db.insert(resetPasswordsTokens).values([
    {
      identifier: userExists.email,
      token: token,
      expires: new Date(Date.now() + 86400 * 1000),
    },
  ]);

  const resetUrl = `${process.env.APP_BASE_URL}/reset-password?token=${token}&email=${userExists.email}`;

  await sendMail({
    subject: 'Reset password request',
    toEmail: userExists.email,
    otpText: `Please click the link below to set new password <br /><a href="${resetUrl}">${resetUrl}</a>`,
  });

  redirect('/email-sent?type=reset_password_send');

  return {
    message: null,
  };
}

export async function setNewPassword(email: string, token: string) {
  const userExists = await isUserExist(email);
  if (!userExists) {
    return {
      message: 'User with this e-mail does not exist',
    };
  }

  const verificationData = await db
    .select()
    .from(resetPasswordsTokens)
    .where(
      and(
        eq(resetPasswordsTokens.token, token as string),
        eq(resetPasswordsTokens.identifier, email as string)
      )
    );

  if (verificationData.length === 0) {
    return {
      message: 'Token is invalid or expired.',
    };
  } else {
    const currentDateTime = new Date().getTime();
    const tokenExpires = new Date(verificationData[0].expires).getTime();
    if (currentDateTime < tokenExpires) {
      const newPassowrd = randomString(3);
      const hashedPassword = await hash(newPassowrd, 10);

      const user = await db
        .update(users)
        .set({ password: hashedPassword })
        .where(eq(users.email, verificationData[0].identifier));

      await db
        .delete(resetPasswordsTokens)
        .where(
          and(
            eq(resetPasswordsTokens.token, token as string),
            eq(resetPasswordsTokens.identifier, email as string)
          )
        );

      // send new password to user
      await sendMail({
        subject: 'New password set',
        toEmail: userExists.email,
        otpText: `Your new password is: <strong>${newPassowrd}</strong>. <br /><br /> Please login with this password and change it in your profile. <br /><br /> Login to dashboard: <a href="${process.env.APP_BASE_URL}">${process.env.APP_BASE_URL}</a>`,
      });

      redirect('/email-sent?type=reset_password_changed');
    } else {
      return {
        message: 'Token is invalid or expired.',
      };
    }
  }
}
