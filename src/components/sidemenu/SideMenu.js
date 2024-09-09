"use client";
import React, { useState } from "react";
import { FiMenu } from "react-icons/fi"; // 메뉴 아이콘 추가

export default function Sidebar() {
	// 사이드바의 상태를 관리하는 useState 훅 추가 (모바일 토글)
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className='flex'>
			{/* 메뉴 버튼 - 작은 화면에서는 표시됨 */}
			<button className='block md:hidden p-4 focus:outline-none' onClick={() => setIsOpen(!isOpen)}>
				<FiMenu size={24} />
			</button>

			{/* 사이드바 - 큰 화면에서는 항상 표시, 작은 화면에서는 토글 가능 */}
			<aside className={`${isOpen ? "block" : "hidden"} w-64 bg-white p-6 shadow-md rounded-lg md:block md:w-64`}>
				<nav className='space-y-6'>
					<div>
						<h2 className='font-bold text-lg text-gray-900 mb-4'>개인회원 홈</h2>
						<div className='space-y-1'>
							<h3 className='font-semibold text-gray-700 mb-3'>
								<a href='/user/mypage/1' className='hover:text-blue-600'>
									마이페이지
								</a>
							</h3>
						</div>
						<div className='space-y-1'>
							<h3 className='font-semibold text-gray-700'>이력서 관리</h3>
							<ul className='space-y-1 text-gray-600'>
								<li>
									<a href='/user/resume-write' className='hover:text-blue-600'>
										이력서 등록
									</a>
								</li>
								<li>
									<a href='/user/resume-list' className='hover:text-blue-600'>
										이력서 현황
									</a>
								</li>
							</ul>
						</div>
					</div>

					<div>
						<h3 className='font-semibold text-gray-700'>입사지원·제안 관리</h3>
						<ul className='space-y-1 text-gray-600'>
							<li>
								<a href='/user/apply-company' className='hover:text-blue-600'>
									입사지원 현황
								</a>
							</li>
							<li>
								<a href='/user/job-offer' className='hover:text-blue-600'>
									입사제안 목록
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h3 className='font-semibold text-gray-700'>스크랩/관심기업</h3>
						<ul className='space-y-1 text-gray-600'>
							<li>
								<a href='#' className='hover:text-blue-600'>
									스크랩 공고
								</a>
							</li>
							<li>
								<a href='#' className='hover:text-blue-600'>
									관심기업
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h3 className='font-semibold text-gray-700'>후기 관리</h3>
						<ul className='space-y-1 text-gray-600'>
							<li>
								<a href='/user/company-review-list' className='hover:text-blue-600'>
									기업후기
								</a>
							</li>
							<li>
								<a href='/user/interview-list' className='hover:text-blue-600'>
									면접후기
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h3 className='font-semibold text-gray-700'>회원정보 관리</h3>
						<ul className='space-y-1 text-gray-600'>
							<li>
								<a href='/user/mypage-update' className='hover:text-blue-600'>
									회원정보 수정
								</a>
							</li>
							<li>
								<a href='/user/pwd-check' className='hover:text-blue-600'>
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
