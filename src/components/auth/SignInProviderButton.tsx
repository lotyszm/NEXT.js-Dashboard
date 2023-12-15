"use client";

import { ClientSafeProvider, signIn } from "next-auth/react";
import Image from "next/image";

export const SignInProviderButton = ({ provider }: { provider: ClientSafeProvider }) => {
  return (
    <button
      className="bg-white active:bg-slate-50 text-slate-700 px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center text-xs ease-linear transition-all duration-150"
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
