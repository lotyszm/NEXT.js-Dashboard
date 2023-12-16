'use client';

import { ClientSafeProvider, signIn } from 'next-auth/react';
import Image from 'next/image';

export const SignInProviderButton = ({
  provider,
}: {
  provider: ClientSafeProvider;
}) => {
  return (
    <button
      className="mb-1 mr-1 inline-flex items-center rounded bg-white px-4 py-2 text-xs uppercase text-slate-700 shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-slate-50"
      onClick={() => signIn(provider.id)}
    >
      <Image
        className="mr-2"
        style={{ filter: 'invert(100%)' }}
        alt={provider.name}
        loading="lazy"
        height="16"
        width="16"
        id={`provider-logo-${provider.name}`}
        src={`https://authjs.dev/img/providers/${provider.name.toLowerCase()}.svg`}
      />
      {provider.name}
    </button>
  );
};
