import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const pathName = request.nextUrl.pathname;
    const isPublic = ['/login', '/sign-up'].includes(pathName);
    const token = request.cookies.get('token')?.value || '';

    // Redirect root URL to login
    if (pathName === '/') {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Prevent access to login and signup pages if the user is authenticated
    if (isPublic && token) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Restrict access to protected pages for unauthenticated users
    if (!isPublic && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Allow request to proceed if conditions are met
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',
        '/login',
        '/sign-up',
        '/verifyemail',
        '/dashboard',
        '/profile',
        '/settings',
        '/logout'
    ],
};
