import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const protectedRoutes = ['/dashboard', '/overview', '/analytics', '/settings'];
const proOnlyRoutes = ['/dashboard', '/analytics'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Ignorar rotas públicas e de autenticação
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname === '/favicon.ico' ||
    pathname.startsWith('/auth') // Ignora todas as rotas de autenticação
  ) {
    return NextResponse.next();
  }

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const requiresAuth = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (requiresAuth && !token) {
    // Se o callbackUrl for para a própria página de login, redirecione para '/'
    let callbackUrl = req.nextUrl.href;
    if (callbackUrl.includes('/auth/signin')) {
      callbackUrl = req.nextUrl.origin + '/';
    }
    const signInUrl = new URL('/auth/signin', req.url);
    signInUrl.searchParams.set('callbackUrl', callbackUrl);
    return NextResponse.redirect(signInUrl);
  }

  const isProOnly = proOnlyRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (token && isProOnly && (token.plan ?? 'FREE') !== 'PRO') {
    const upgradeUrl = new URL('/upgrade', req.url);
    return NextResponse.redirect(upgradeUrl);
  }

  // Criar resposta
  const response = NextResponse.next();

  // Headers de segurança
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
  );

  // Headers de cache para assets estáticos
  if (pathname.startsWith('/_next/') || pathname.startsWith('/api/')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }

  // Rate limiting básico (em produção, use uma solução mais robusta)
  const ip = req.headers.get('x-forwarded-for') || 'unknown';
  
  // Log de requisições em desenvolvimento
  if (process.env.NODE_ENV === 'development') {
    console.log(`${req.method} ${pathname} - ${ip}`);
  }

  return response;
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/overview',
    '/analytics/:path*',
    '/settings/:path*',
  ],
};
