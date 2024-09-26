import { NextResponse } from "next/server";

export function middleware(request) {
	const url = request.nextUrl.clone();

	// /company로 시작하는 경로에 대한 요청을 체크
	if (url.pathname.startsWith("/company")) {
		// /login으로 리다이렉트
		url.pathname = "/login";

		// 응답 생성
		const response = NextResponse.redirect(url);

		// "text" 쿠키를 1로 설정
		response.cookies.set("text", "1", {
			httpOnly: true, // 클라이언트에서 접근 불가하게 설정 (보안)
			path: "/", // 모든 경로에 적용
			maxAge: 60 * 60, // 쿠키 유효기간 1시간 설정 (옵션)
		});

		return response;
	}

	// 기본적으로 요청을 통과시킴
	return NextResponse.next();
}

// 이 미들웨어가 작동할 경로 설정
export const config = {
	matcher: ["/company/:path*"],
};
