import NextAuth from "next-auth/next";
import GithHubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };