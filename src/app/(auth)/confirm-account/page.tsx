import Image from 'next/image';
import Logo from '@/../public/logo.svg';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/db';
import { users, verificationTokens } from '@/db/schema/user';
import { and, eq } from 'drizzle-orm';

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
      <section className="flex min-h-screen flex-col items-center justify-center bg-slate-100">
        <div className="mx-auto w-full px-4 pt-6 lg:w-4/12 ">
          <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded-lg border-0 bg-white shadow-lg">
            <div className="mb-0 rounded-t px-6 py-6">
              <div className="mb-3 flex flex-col items-center justify-center text-center">
                <Link href="/">
                  <Image
                    alt={process.env.COMPANY_NAME!}
                    src={Logo}
                    width={110}
                    height={110}
                    className="mb-0 mt-6"
                  />
                </Link>
              </div>
            </div>

            <hr className="border-b-1 my-6 border-slate-300" />

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
          </div>
        </div>
        <footer className="relative mt-2 pb-6 pt-8">
          <div className="container mx-auto px-2">
            <div className="flex items-center justify-center md:justify-between">
              <div className="mx-auto w-full px-4 text-center md:w-6/12">
                <div className="py-1 text-sm font-semibold text-slate-500"></div>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </>
  );
}
