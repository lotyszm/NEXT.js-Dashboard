import { AuthCard } from '@/components/auth/card/AuthCard';
import { ResetPasswordForm } from './ResetPasswordForm';
import { setNewPassword } from './actions';

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { token, email } = searchParams;
  if (token && email) {
    const result = await setNewPassword(email as string, token as string);
    console.log(result);
  }

  return (
    <AuthCard>
      <ResetPasswordForm />
    </AuthCard>
  );
}
