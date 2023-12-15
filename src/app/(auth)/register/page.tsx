import { db } from "@/db";
import { users } from "@/db/schema/user";
import { hash } from "bcrypt";
import { redirect } from "next/navigation";


export default async function RegisterPage() {

  async function registerUser(_formData: FormData) {
    "use server";
    const username = _formData.get('username');
    const password = _formData.get('password');


    // TODO: Check if user exists !!!! 

    const hashedPassword = await hash(password?.toString() as string, 10);

    const insertUser = {
      id: crypto.randomUUID(),
      name: username?.toString() as string,
      email: username?.toString() as string,
      emailVerified: null,
      image: null,
      password: hashedPassword
    } satisfies typeof users.$inferInsert;

    const user = await db.insert(users).values([insertUser]);
    redirect('/email-sent?type=register');
  }

  return (
    <form className="flex flex-col gap-2 max-w-md mx-auto" action={registerUser}>
      <input className="border border-black text-black" type="email" name="username" />
      <input className="border border-black text-black" type="password" name="password" />
      <button type="submit">Register</button>
    </form>
  );
}