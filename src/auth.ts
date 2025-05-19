import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // This is the first time the user is signing in
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      // console.log('Session callback', { session, token });
      // Set provider-specific ID on the session object
      (session.user as { id?: string }).id = token.id as string;
      return session;
    },
  },
});
