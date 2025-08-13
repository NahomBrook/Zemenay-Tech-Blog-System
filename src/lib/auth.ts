import { NextAuthOptions, DefaultSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      username?: string | null;
      role?: 'USER' | 'ADMIN';
    } & DefaultSession['user'];
  }

  interface User {
    username?: string | null;
    role?: 'USER' | 'ADMIN';
    emailVerified?: Date | null;
  }
}

export const authOptions: NextAuthOptions = {
  // Configure Google OAuth provider only
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          prompt: 'select_account',
          access_type: 'offline',
          response_type: 'code'
        }
      },
    }),
  ],
  
  // Session configuration
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  
  // Custom pages
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  
  // Callbacks
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        return {
          ...token,
          id: user.id,
          role: 'USER', // Default role
          accessToken: account.access_token,
        };
      }
      return token;
    },
    
    async session({ session, token }) {
      if (session.user) {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id as string,
            role: token.role as string || 'USER',
          }
        };
      }
      return session;
    },
  },
  
  // Security options
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
  useSecureCookies: process.env.NODE_ENV === 'production',
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
      },
    },
  },
}
