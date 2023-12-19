import { redirect } from 'next/navigation';
import Link from 'next/link';
import { AuthCard } from '@/components/auth/card/AuthCard';

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
      <AuthCard>
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
      </AuthCard>
    </>
  );
}
