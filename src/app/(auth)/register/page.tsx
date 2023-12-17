'use client';

import { useFormState } from 'react-dom';
import { registerUserAction } from './actions';

const initialState = {
  message: null,
};

export default function RegisterPage() {
  const [state, formAction] = useFormState(registerUserAction, initialState);

  return (
    <form className="mx-auto flex max-w-md flex-col gap-2" action={formAction}>
      <input
        className="border border-black text-black"
        type="email"
        name="username"
      />
      <input
        className="border border-black text-black"
        type="password"
        name="password"
      />
      {/* <p aria-live="polite" className="sr-only"> */}
      {state?.message}
      {/* </p> */}
      <button type="submit">Register</button>
    </form>
  );
}
