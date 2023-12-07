import { signJwt } from '@/app/lib/jwt';
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async signIn({ account, user }) {
      if (account) {
        const { name: displayName, email, image: picture } = user;
        const {
          expires_at: expiresIn,
          providerAccountId,
          access_token: accessToken,
          refresh_token: refreshToken,
          id_token: idToken
        } = account;

        const data = {
          displayName,
          email,
          picture,
          expiresIn,
          providerAccountId,
          accessToken,
          refreshToken,
          idToken
        };

        await fetch('http://localhost:3001/auth/validate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
          .then(async (response) => {
            const data = await response.json();
            if (data.message === 'Success') {
              return true;
            }
          })
          .catch((error) => {
            console.log('On save user error: ', error);
            return false;
          });
      }

      return true;
    },
    async jwt({ token, account }) {
      if (account) {
        const { sub } = token;
        const { id_token, access_token, expires_at } = account;

        token.accessToken = await signJwt({
          sub,
          id_token,
          access_token,
          expires_at
        });
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = String(token.accessToken);
      return session;
    }
  }
});

export { handler as GET, handler as POST };
