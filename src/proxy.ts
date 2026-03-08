import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { DEFAULT_VALUES } from './shared/utils/default-values';

export function proxy(request: NextRequest) {
    const token = request.cookies.get(DEFAULT_VALUES.COOKIE_KEY);

    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*'],
}