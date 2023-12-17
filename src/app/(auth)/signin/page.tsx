import { SignInProviderButton } from '@/components/auth/SignInProviderButton';
import { getCsrfToken, getProviders, signIn } from 'next-auth/react';
import Link from 'next/link';
import Logo from '@/../public/logo.svg';
import Image from 'next/image';

if (!process.env.COMPANY_NAME) {
  throw new Error('COMPANY_NAME environment variable is not set.');
}

export default async function SignInPage() {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken();

  if (!providers) {
    throw new Error('No providers');
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
              <h6 className="mb-8 text-center font-bold text-slate-800">
                Sign in with credentials
              </h6>
              <div className="flex-auto px-4 py-10 pt-0 lg:px-10">
                <form
                  action={async (_formdata: FormData) => {
                    'use server';
                    const email = _formdata.get('username');
                    const password = _formdata.get('password');
                    signIn('credentials', {
                      email: email,
                      password: password,
                      callbackUrl: '/',
                    });
                  }}
                >
                  <input
                    name="csrfToken"
                    type="hidden"
                    defaultValue="150440a72d8ce0592e3ba0099a46a03b173892d91702d0f6282ef7ed58551ff0"
                  />
                  <div className="relative mb-3 w-full">
                    <label
                      className="mb-2 block text-xs font-bold uppercase text-slate-600"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="username"
                      className="w-full rounded border-0 bg-white px-3 py-3 text-sm text-slate-600 placeholder-slate-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                      placeholder="Email"
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

            {Object.values(providers).filter(
              (provider) =>
                !['Email', 'Credentials', 'login'].includes(provider.name)
            ).length > 0 && (
              <>
                <hr className="border-b-1 mb-3 border-slate-300" />

                <div className="mb-0 mt-3 rounded-t px-6 py-6">
                  <div className="mb-8 text-center font-bold text-slate-400">
                    <small>Sign in with providers</small>
                  </div>
                  <div className="btn-wrapper text-center">
                    {Object.values(providers)
                      .filter(
                        (provider) =>
                          !['Email', 'Credentials', 'login'].includes(
                            provider.name
                          )
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
