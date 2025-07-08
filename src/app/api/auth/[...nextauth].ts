import NextAuth, { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from '@/infra/prisma/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await prisma.user.findUnique({ where: { email: user.email! } });
        token.email = dbUser?.email ?? '';
        token.name = dbUser?.name ?? '';
        token.image = typeof dbUser?.image === 'string' ? dbUser.image : null;
        // @ts-expect-error: campo plan customizado
        token.plan = typeof dbUser?.plan === 'string' ? dbUser.plan : 'FREE';
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = typeof token.email === 'string' ? token.email : '';
        session.user.name = typeof token.name === 'string' ? token.name : '';
        session.user.image = typeof token.image === 'string' ? token.image : null;
        // @ts-expect-error: campo plan customizado
        session.user.plan = typeof token.plan === 'string' ? token.plan : 'FREE';
      }
      return session;
    },
    async redirect({ baseUrl }) {
      // Sempre redireciona para o dashboard após login
      return `${baseUrl}/dashboard`;
    }
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  }
};

export default NextAuth(authOptions);
