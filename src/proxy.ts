import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { DEFAULT_VALUES } from './shared/utils/default-values';
import { PRIVATE_ROUTE, PUBLIC_ROUTE } from './shared/routes';
import { isTokenValid } from '@/features/auth';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();
  const tokenValue = request.cookies.get(DEFAULT_VALUES.COOKIE_KEY)?.value;
  const hasValidToken = isTokenValid(tokenValue);

  const isPrivateRoute = Object.values(PRIVATE_ROUTE).some(route =>
    pathname.startsWith(route)
  );

  if (isPrivateRoute && !hasValidToken) {
    url.pathname = PUBLIC_ROUTE.LOGIN;
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith(PUBLIC_ROUTE.LOGIN) && hasValidToken) {
    url.pathname = PRIVATE_ROUTE.DASHBOARD;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
