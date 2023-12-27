'use client';

import { AuthMessageComponent } from '@/components/auth/card/AuthMessageComponent';
import { useFormState } from 'react-dom';
import { resetPasswordAction } from './actions';
import Link from 'next/link';

const initialState = {
  message: null,
};

const ResetPasswordForm = () => {
  const [state, formAction] = useFormState(resetPasswordAction, initialState);

  return (
    <>
      <div className="mb-0 rounded-t px-6 py-6">
        <h6 className="mb-8 text-center font-bold text-slate-800">
          Reset your password
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

            <div className="mt-6 text-center">
              <button
                className="mb-1 mr-1 w-full rounded bg-slate-800 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-slate-600"
                type="submit"
              >
                Send confirmation link
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="flex-auto px-4 py-10 pt-0 text-center lg:px-10">
        <Link className="underline" href="/signin">
          Back to login page
        </Link>
      </div>
    </>
  );
};

export { ResetPasswordForm };
