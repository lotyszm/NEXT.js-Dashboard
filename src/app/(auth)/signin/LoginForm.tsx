'use client';

import { SignInProviderButton } from '@/components/auth/card/SignInProviderButton';
import {
  ClientSafeProvider,
  LiteralUnion,
  getProviders,
  signIn,
} from 'next-auth/react';
import { FormEvent, useEffect, useState } from 'react';
import { BuiltInProviderType } from '@auth/core/providers';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AuthMessageComponent } from '@/components/auth/card/AuthMessageComponent';

// errors
// https://authjs.dev/reference/core/errors#credentialssignin
const errorMessages: Record<string, string> = {
  DefaultError: 'An error occurred while trying to sign in.',
  CredentialsSignin:
    "Invalid credentials or account does not exist or isn't verified.",
};

type ProvidersType = Record<
  LiteralUnion<BuiltInProviderType, string>,
  ClientSafeProvider
>;

const LoginForm = () => {
  const [providers, setProviders] = useState<ProvidersType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    getProviders().then((providersTmp) => {
      setProviders(providersTmp as ProvidersType | null);
      setIsLoading(false);
    });
  }, []);

  const router = useRouter();

  if (isLoading)
    return <p className="p-5 text-center italic">Loading providers</p>;

  const providersArray = providers !== null ? Object.values(providers) : [];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');
    const response = await signIn('credentials', {
      email: email,
      password: password,
      // callbackUrl: '/',
      redirect: false,
    });

    console.log({ response });
    if (!response?.error) {
      router.push('/');
      router.refresh();
      return;
    }

    if (errorMessages[response.error as string]) {
      setMessage(errorMessages[response.error as string]);
    } else {
      setMessage(errorMessages.DefaultError);
    }
  };

  return (
    <>
      <div className="mb-0 rounded-t px-6 py-6">
        <h6 className="mb-8 text-center font-bold text-slate-800">
          Sign in with credentials
        </h6>
        <div className="flex-auto px-4 py-10 pt-0 lg:px-10">
          <form onSubmit={handleSubmit}>
            {message && <AuthMessageComponent message={message} type="error" />}

            <div className="relative mb-3 w-full">
              <label
                className="mb-2 block text-xs font-bold uppercase text-slate-600"
                htmlFor="grid-password"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                className="w-full rounded border-0 bg-white px-3 py-3 text-sm text-slate-600 placeholder-slate-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                placeholder="Email"
                required
              />
            </div>
            <div className="relative mb-3 w-full">
              <label
                className="mb-2 block text-xs font-bold uppercase text-slate-600"
                htmlFor="grid-password"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                className="w-full rounded border-0 bg-white px-3 py-3 text-sm text-slate-600 placeholder-slate-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                placeholder="Password"
                required
              />
            </div>

            <div className="mt-6 text-center">
              <button
                className="mb-1 mr-1 w-full rounded bg-slate-800 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-slate-600"
                type="submit"
              >
                {' '}
                Sign In{' '}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="flex-auto px-4 py-10 pt-0 text-center lg:px-10">
        <Link className="underline" href="/register">
          Register new account
        </Link>
      </div>

      {providersArray.filter(
        (provider) => !['Email', 'Credentials', 'login'].includes(provider.name)
      ).length > 0 && (
        <>
          <hr className="border-b-1 mb-3 border-slate-300" />

          <div className="mb-0 mt-3 rounded-t px-6 py-6">
            <div className="mb-8 text-center font-bold text-slate-400">
              <small>Sign in with providers</small>
            </div>
            <div className="btn-wrapper text-center">
              {providersArray
                .filter(
                  (provider) =>
                    !['Email', 'credentials', 'login'].includes(provider.name)
                )
                .map((provider) => (
                  <div key={provider.name}>
                    <SignInProviderButton provider={provider} />
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export { LoginForm };
