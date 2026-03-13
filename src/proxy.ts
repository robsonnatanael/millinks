import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { DEFAULT_VALUES } from './shared/utils/default-values';
import { PRIVATE_ROUTE, PUBLIC_ROUTE } from './shared/routes';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(DEFAULT_VALUES.COOKIE_KEY);

  const isPrivateRoute = Object.values(PRIVATE_ROUTE).some(route =>
    pathname.startsWith(route)
  );

  if (isPrivateRoute && !token) {
    return NextResponse.redirect(new URL(PUBLIC_ROUTE.LOGIN, request.url));
  }

  if (pathname.startsWith(PUBLIC_ROUTE.LOGIN) && token) {
    return NextResponse.redirect(new URL(PRIVATE_ROUTE.DASHBOARD, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
