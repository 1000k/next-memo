import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: true,
  providers: [Google],
  callbacks: {
    jwt({ token, user, profile }) {
      if (user) {
        console.log('profile:', profile);
        // This is the first time the user is signing in
        token.id = user.id;
        token.sub = profile.sub;
      }
      return token;
    },
    session({ session, token }) {
      // console.log('Session callback', { session, token });
      // Set provider-specific ID on the session object
      session.user.id = token.id;
      session.user.externalUserId = token.sub;
      return session;
    },
  },
});
