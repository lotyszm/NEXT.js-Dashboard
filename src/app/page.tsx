import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import SignOutButton from '@/components/auth/card/SignOutButton';
import { authOptions } from '@/lib/auth';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect('/api/auth/signin');
  }

  return (
    <main className="">
      <h1>logged</h1>
      <SignOutButton />
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </main>
  );
}
