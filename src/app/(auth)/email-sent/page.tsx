import Image from 'next/image';
import Logo from '@/../public/logo.svg';
import { redirect } from 'next/navigation';
import Link from 'next/link';

if (!process.env.COMPANY_NAME) {
  throw new Error('COMPANY_NAME environment variable is not set.');
}

const content: { [key: string]: string } = {
  register: 'Check your email for the confirmation link.',
  reset: 'Check your email for the reset link.',
};

export default function EmailSentPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const contentType = searchParams['type'] as string;
  if (!contentType || !content[contentType]) {
    redirect('/');
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
                E-mail sent
              </h6>
              <div className="flex-auto px-4 py-10 pt-0 text-center lg:px-10">
                {content[contentType]}
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
