import { NextAuthOptions, DefaultSession, User } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from './prisma';
import bcrypt from 'bcryptjs';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      username?: string | null;
      role?: 'USER' | 'AUTHOR' | 'ADMIN';
    } & DefaultSession['user'];
  }

  interface User {
    username?: string | null;
    role?: 'USER' | 'AUTHOR' | 'ADMIN';
    emailVerified?: Date | null;
  }
}

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    // Email/Password Authentication
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter both email and password');
        }

        // Find user by email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        // Check if user exists
        if (!user || !user.hashedPassword) {
          throw new Error('Invalid credentials');
        }

        // Verify password
        const isValid = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isValid) {
          throw new Error('Invalid credentials');
        }

        // Return user object without the password
        const { hashedPassword, ...userWithoutPassword } = user;
        return userWithoutPassword as User;
      }
    }),
    
    // Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      allowDangerousEmailAccountLinking: true,
    }),
    
    // GitHub OAuth
    GitHubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
  ],
  
  // Custom pages
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/register',
  },
  
  // Session configuration
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  
  // JWT configuration
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },
  
  // Callbacks
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.role = user.role || 'USER';
        token.username = user.username;
      }
      
      // Add access_token to the token right after signin with OAuth
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }
      
      return token;
    },
    
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as 'USER' | 'AUTHOR' | 'ADMIN';
        session.user.username = token.username as string | undefined;
      }
      return session;
    },
    
    async signIn({ user, account, profile }) {
      // Handle OAuth sign in
      if (account?.provider !== 'credentials') {
        // Check if user exists in database
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email as string }
        });
        
        // Create new user if they don't exist
        if (!existingUser) {
          try {
            await prisma.user.create({
              data: {
                email: user.email as string,
                name: user.name,
                image: user.image,
                emailVerified: new Date(),
                username: user.email?.split('@')[0],
                role: 'USER',
              },
            });
          } catch (error) {
            console.error('Error creating user:', error);
            return false;
          }
        }
      }
      
      return true;
    },
  },
  
  // Enable debug in development
  debug: process.env.NODE_ENV === 'development',
  
  // Security options
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
