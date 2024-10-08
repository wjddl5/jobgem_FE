import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decode } from 'js-base64';

const AUTH_PAGES = ['/', '/login'];
const LOGIN_PAGE = '/login';
const ADMIN_LOGIN_PAGE = '/admin/login';
const MAIN_PAGE = '/';
const ADMIN_MAIN_PAGE = '/admin';

export async function middleware(req) {
	const { pathname } = req.nextUrl;
	const cookie = cookies();
	const accessToken = cookie.get('accessToken');
	const method = req.method;
	let payloadObject;

	// accessToken -> JSON변환
	if (accessToken) {
		const payload = accessToken.value.split('.')[1];
		const decodedPayload = decode(payload);
		payloadObject = JSON.parse(decodedPayload);
	}
	//===

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

	// /user 경로로 시작하는 경우 로그인 필요
	// usType이 일치하지 않을 경우 메인페이지로 이동
	if (pathname.startsWith('/user')) {
		if (!accessToken) {
			return NextResponse.redirect(new URL(LOGIN_PAGE, req.url));
		}
		if (payloadObject.ROLE != 1) {
			return NextResponse.redirect(new URL(MAIN_PAGE, req.url));
		}
	}

	// /company 경로로 시작하는 경우
	if (pathname.startsWith('/company')) {
		if (!accessToken) {
			return NextResponse.redirect(new URL(LOGIN_PAGE, req.url));
		}
		if (payloadObject.ROLE != 2) {
			return NextResponse.redirect(new URL(MAIN_PAGE, req.url));
		}
	}

	// /admin 경로로 시작하는 경우
	if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
		if (!accessToken) {
			return NextResponse.redirect(new URL(ADMIN_LOGIN_PAGE, req.url));
		}
		if (payloadObject.ROLE != 0) {
			return NextResponse.redirect(new URL(MAIN_PAGE, req.url));
		}
	}
	if (accessToken && pathname.startsWith('/admin/login')) {
		return NextResponse.redirect(new URL(ADMIN_MAIN_PAGE, req.url));
	}

	// 그 외 모든 경우 요청을 정상적으로 진행
	return NextResponse.next();
}
