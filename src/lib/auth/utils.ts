import { db } from '@/db';
import { users } from '@/db/schema/user';
import { eq } from 'drizzle-orm';

export async function isUserExist(email: string) {
  if (!email) {
    return false;
  }
  const userExists = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  if (userExists.length > 0) {
    return userExists[0];
  }
  return false;
}
