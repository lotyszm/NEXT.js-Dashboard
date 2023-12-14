import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import SignOutButton from "@/components/next-auth/SignOutButton";

export default async function Home() {

  const session = await getServerSession();

  if(!session || !session.user) {
    redirect('/api/auth/signin');
  }

  console.dir(session, { depth: 10 })

  return (
    <main className="">
      <h1>logged</h1>
      <SignOutButton />
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </main>
  )
}
