import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const AUTH_PAGES = ['/', '/login'];
const LOGIN_PAGE = '/login';

export async function middleware(req) {
    const { pathname } = req.nextUrl;
    const cookie = cookies();
    const accessToken = cookie.get('accessToken');
    const method = req.method;

    // 비회원이 접근 가능한 페이지 (메인, 로그인, POST 메서드로 시작하는 페이지)
    if (AUTH_PAGES.includes(pathname) || method === 'POST') {
        if (accessToken) {
            // 로그인 상태에서 로그인 페이지로 접근 시 메인 페이지로 리다이렉트
            if (pathname === LOGIN_PAGE) {
                return NextResponse.redirect(new URL('/', req.url));
            }
        }
        // 비회원 접근 허용
        return NextResponse.next();
    }

    // /company 또는 /user 경로로 시작하는 경우 로그인 필요
    if (pathname.startsWith('/company') || pathname.startsWith('/user')) {
        if (!accessToken) {
            return NextResponse.redirect(new URL(LOGIN_PAGE, req.url));
        }
    }

    // 그 외 모든 경우 요청을 정상적으로 진행
    return NextResponse.next();
}
