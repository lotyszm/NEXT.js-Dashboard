import React from 'react';
import { AuthCardFooter } from './AuthCardFooter';
import { AuthCardLogo } from './AuthCardLogo';

const AuthCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-slate-100">
      <div className="mx-auto w-full px-4 pt-6 lg:w-4/12 ">
        <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded-lg border-0 bg-white shadow-lg">
          <AuthCardLogo />
          <hr className="border-b-1 my-6 border-slate-300" />
          {children}
        </div>
      </div>

      <AuthCardFooter />
    </section>
  );
};

export { AuthCard };
