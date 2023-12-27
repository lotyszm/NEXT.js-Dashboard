import { getCsrfToken, getProviders } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';
import { redirect } from 'next/navigation';
import { LoginForm } from './LoginForm';
import { AuthCard } from '@/components/auth/card/AuthCard';

if (!process.env.COMPANY_NAME) {
  throw new Error('COMPANY_NAME environment variable is not set.');
}

if (!process.env.URL_AFTER_LOGIN) {
  throw new Error('URL_AFTER_LOGIN environment variable is not set.');
}

export default async function SignInPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect(process.env.URL_AFTER_LOGIN ?? '/');
  }

  const providers = await getProviders();

  if (!providers) {
    throw new Error('No providers');
  }

  return (
    <>
      <AuthCard>
        <LoginForm />
      </AuthCard>
    </>
  );
}
