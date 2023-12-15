import { SignInProviderButton } from "@/components/auth/SignInProviderButton";
import { getCsrfToken, getProviders, signIn } from "next-auth/react";

export default async function SignInPage() {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken()

  if (!providers) {
    throw new Error("No providers");
  }

  return (
    <>
      <section className="bg-slate-200 min-h-screen flex justify-center items-center flex-col">
        <div className="w-full lg:w-4/12 px-4 mx-auto pt-6 ">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg border-0 bg-white">
            <div className="rounded-t mb-0 px-6 py-6">
              <div className="text-center mb-3">
                <h6 className="text-slate-800 text-sm font-bold">Sign in with</h6>
              </div>
              <div className="btn-wrapper text-center">
                {Object.values(providers)
                  .filter((provider) => !["Email", "Credentials"].includes(provider.name))
                  .map((provider) => (
                    <div key={provider.name}>
                      <SignInProviderButton provider={provider} />
                    </div>
                  ))}
              </div>
              <hr className="mt-6 border-b-1 border-slate-300" />
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <div className="text-slate-400 text-center mb-3 font-bold">
                <small>Or sign in with credentials</small>
              </div>
              <form action={async (_formdata: FormData) => {
                "use server";
                const email = _formdata.get('username');
                const password = _formdata.get('password');
                signIn('credentials', { email: email, password: password, callbackUrl: '/' })
              }}>
                {/* <input name="csrfToken" type="hidden" defaultValue='150440a72d8ce0592e3ba0099a46a03b173892d91702d0f6282ef7ed58551ff0' /> */}
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-slate-600 text-xs font-bold mb-2" htmlFor="grid-password">
                    Email
                  </label>
                  <input
                    type="email"
                    name="username"
                    className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Email"
                  />
                </div>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-slate-600 text-xs font-bold mb-2" htmlFor="grid-password">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Password"
                  />
                </div>

                <div className="text-center mt-6">
                  <button
                    className="bg-slate-800 text-white active:bg-slate-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    type="submit"
                  >
                    {" "}
                    Sign In{" "}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <footer className="relative pt-8 pb-6 mt-2">
          <div className="container mx-auto px-2">
            <div className="flex items-center md:justify-between justify-center">
              <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                <div className="text-sm text-slate-500 font-semibold py-1"></div>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </>
  );
}
