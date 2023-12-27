'use client';

import Link from 'next/link';
import { AuthMessageComponent } from '@/components/auth/card/AuthMessageComponent';
import { registerUserAction } from './actions';
import { useFormState } from 'react-dom';

// errors
// https://authjs.dev/reference/core/errors#credentialssignin
const errorMessages: Record<string, string> = {
  DefaultError: 'An error occurred while trying to sign in.',
  CredentialsSignin:
    "Invalid credentials or account does not exist or isn't verified.",
};

const initialState = {
  message: null,
};

const RegisterForm = () => {
  const [state, formAction] = useFormState(registerUserAction, initialState);

  return (
    <>
      <div className="mb-0 rounded-t px-6 py-6">
        <h6 className="mb-8 text-center font-bold text-slate-800">
          Register new account
        </h6>
        <div className="flex-auto px-4 py-10 pt-0 lg:px-10">
          <form action={formAction}>
            {state?.message && (
              <AuthMessageComponent message={state.message} type="error" />
            )}

            <div className="relative mb-3 w-full">
              <label
                className="mb-2 block text-xs font-bold uppercase text-slate-600"
                htmlFor="username"
              >
                Email
              </label>
              <input
                type="email"
                name="username"
                id="username"
                autoComplete="email"
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
                id="password"
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
                Register{' '}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="flex-auto px-4 py-10 pt-0 text-center lg:px-10">
        <Link className="underline" href="/signin">
          Have account? Log in
        </Link>
      </div>
    </>
  );
};

export { RegisterForm };
