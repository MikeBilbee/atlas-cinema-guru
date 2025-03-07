//auth.ts
import { fetchUser } from "./lib/data";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  theme: {
	
    brandColor: "#ffffff",
    logo: "/logo.png",
    buttonText: "#ffffff",
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
	Credentials({
		credentials: {
		  email: {
			label: "Email",
		  },
		  password: {
			label: "Password",
			type: "password",
		  },
		},
		//@ts-ignore
		authorize: async (credentials: { email: string; password: string }) => {
		  const { email, password } = credentials;
		  const user = await fetchUser(email);
		  if (!user) return null; //@ts-ignore
		  const passwordsMatch = await bcrypt.compare(password, user.password);
		  if (passwordsMatch) return user;
		  return null;
		},
	  }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
  },
});
