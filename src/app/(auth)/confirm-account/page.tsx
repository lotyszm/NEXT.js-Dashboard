import { redirect } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/db';
import { users, verificationTokens } from '@/db/schema/user';
import { and, eq } from 'drizzle-orm';
import { AuthCard } from '@/components/auth/card/AuthCard';

if (!process.env.COMPANY_NAME) {
  throw new Error('COMPANY_NAME environment variable is not set.');
}

let message = {
  title: 'Invalid token',
  description: 'Token is invalid or expired.',
};

export default async function ConfirmAccountPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { token, email } = searchParams;
  if (!token || !email) {
    redirect('/signin');
  }

  const verificationData = await db
    .select()
    .from(verificationTokens)
    .where(
      and(
        eq(verificationTokens.token, token as string),
        eq(verificationTokens.identifier, email as string)
      )
    );

  if (verificationData.length === 0) {
    message = {
      title: 'Invalid token',
      description: 'Token is invalid or expired.',
    };
  } else {
    const currentDateTime = new Date().getTime();
    const tokenExpires = new Date(verificationData[0].expires).getTime();
    if (currentDateTime < tokenExpires) {
      message = {
        title: 'Confirm account',
        description: 'Account confirmed successfully.',
      };

      const user = await db
        .update(users)
        .set({ emailVerified: new Date() })
        .where(eq(users.email, verificationData[0].identifier));

      await db
        .delete(verificationTokens)
        .where(
          and(
            eq(verificationTokens.token, token as string),
            eq(verificationTokens.identifier, email as string)
          )
        );
    }
  }

  return (
    <>
      <AuthCard>
        <div className="mb-0 rounded-t px-6 py-6">
          <h6 className="mb-8 text-center text-2xl font-bold text-slate-800">
            {message.title}
          </h6>
          <div className="flex-auto px-4 py-10 pt-0 text-center lg:px-10">
            {message.description}
          </div>
          <div className="flex-auto px-4 py-10 pt-0 text-center lg:px-10">
            <Link className="underline" href="/signin">
              Go to login page
            </Link>
          </div>
        </div>
      </AuthCard>
    </>
  );
}
