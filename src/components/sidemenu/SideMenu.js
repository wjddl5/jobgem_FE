import React from "react";

export default function () {
	return (
		<div>
			<aside className='w-64 bg-white p-6 shadow-md rounded-lg'>
				<nav className='space-y-6'>
					<div>
						<h2 className='font-bold text-lg text-gray-900 mb-4'>개인회원 홈</h2>
						<div className='space-y-1'>
							<h3 className='font-semibold text-gray-700'>이력서 관리</h3>
							<ul className='space-y-1 text-gray-600'>
								<li>
									<a href='/user/write' className='hover:underline'>
										이력서 등록(작성페이지)
									</a>
								</li>
								<li>
									<a href='#' className='hover:underline'>
										이력서 현황 (작성했던애들 목록-수정 삭제 가능)
									</a>
								</li>
							</ul>
						</div>
					</div>

					<div>
						<h3 className='font-semibold text-gray-700'>입사지원·제안 관리</h3>
						<ul className='space-y-1 text-gray-600'>
							<li>
								<a href='/user/apply-company' className='hover:underline'>
									입사지원 현황 (이력서 제출한 회사목록)
								</a>
							</li>
							<li>
								<a href='/user/job-offer' className='hover:underline'>
									입사제안 목록(입사제안 신청온 회사목록)
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h3 className='font-semibold text-gray-700'>스크랩/관심기업</h3>
						<ul className='space-y-1 text-gray-600'>
							<li>
								<a href='#' className='hover:underline'>
									스크랩 공고
								</a>
							</li>
							<li>
								<a href='#' className='hover:underline'>
									관심기업
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h3 className='font-semibold text-gray-700'>컨텐츠 관리</h3>
						<ul className='space-y-1 text-gray-600'>
							<li>
								<a href='/user/company-review-list' className='hover:underline'>
									기업후기
								</a>
							</li>
							<li>
								<a href='/user/meeting-review-list' className='hover:underline'>
									면접후기
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h3 className='font-semibold text-gray-700'>회원정보 관리</h3>
						<ul className='space-y-1 text-gray-600'>
							<li>
								<a href='/user/mypage-update' className='hover:underline'>
									회원정보 수정
								</a>
							</li>
							<li>
								<a href='/user/pwd-check' className='hover:underline'>
									비밀번호 변경
								</a>
							</li>
						</ul>
					</div>
				</nav>
			</aside>
		</div>
	);
}
