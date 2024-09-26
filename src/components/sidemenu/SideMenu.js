"use client";
import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function Sidebar() {
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter(); // useRouter 훅 사용

	return (
		<div className='sticky top-24'>
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
								{/* 마이페이지로 이동 */}
								<span onClick={() => router.push(`/user/`)} className='hover:text-blue-600 cursor-pointer'>
									마이페이지
								</span>
							</h3>
						</div>
						<div className='space-y-1'>
							<h3 className='font-semibold text-gray-700'>이력서 관리</h3>
							<ul className='space-y-1 text-gray-600'>
								<li>
									{/* 이력서 등록 */}
									<span onClick={() => router.push(`/user/resume-write`)} className='hover:text-blue-600 cursor-pointer'>
										이력서 등록
									</span>
								</li>
								<li>
									{/* 이력서 현황 */}
									<span onClick={() => router.push(`/user/resume-list`)} className='hover:text-blue-600 cursor-pointer'>
										이력서 현황
									</span>
								</li>
							</ul>
						</div>
					</div>

					<div>
						<h3 className='font-semibold text-gray-700'>입사지원·제안 관리</h3>
						<ul className='space-y-1 text-gray-600'>
							<li>
								{/* 입사지원 현황 */}
								<span onClick={() => router.push(`/user/apply-company`)} className='hover:text-blue-600 cursor-pointer'>
									입사지원 현황
								</span>
							</li>
							<li>
								{/* 입사제안 목록 */}
								<span onClick={() => router.push(`/user/job-offer`)} className='hover:text-blue-600 cursor-pointer'>
									입사제안 목록
								</span>
							</li>
						</ul>
					</div>

					<div>
						<h3 className='font-semibold text-gray-700'>스크랩/관심기업</h3>
						<ul className='space-y-1 text-gray-600'>
							<li>
								{/* 스크랩 공고 */}
								<span onClick={() => router.push(`/user/scrap`)} className='hover:text-blue-600 cursor-pointer'>
									스크랩 공고
								</span>
							</li>
							<li>
								{/* 관심기업 */}
								<span onClick={() => router.push(`/user/favorite-companies`)} className='hover:text-blue-600 cursor-pointer'>
									관심기업
								</span>
							</li>
						</ul>
					</div>

					<div>
						<h3 className='font-semibold text-gray-700'>커뮤니티</h3>
						<ul className='space-y-1 text-gray-600'>
							<li>
								{/* 공지사항 */}
								<span onClick={() => router.push(`/user/bbs-notice-list`)} className='hover:text-blue-600 cursor-pointer'>
									공지사항
								</span>
							</li>
							<li>
								{/* Q&A */}
								<span onClick={() => router.push(`/user/bbs-qna-list`)} className='hover:text-blue-600 cursor-pointer'>
									Q&A
								</span>
							</li>
						</ul>
					</div>

					<div>
						<h3 className='font-semibold text-gray-700'>후기 관리</h3>
						<ul className='space-y-1 text-gray-600'>
							<li>
								{/* 기업후기 */}
								<span onClick={() => router.push(`/user/company-review-list`)} className='hover:text-blue-600 cursor-pointer'>
									기업후기
								</span>
							</li>
							<li>
								{/* 면접후기 */}
								<span onClick={() => router.push(`/user/interview-list`)} className='hover:text-blue-600 cursor-pointer'>
									면접후기
								</span>
							</li>
						</ul>
					</div>

					<div>
						<h3 className='font-semibold text-gray-700'>회원정보 관리</h3>
						<ul className='space-y-1 text-gray-600'>
							<li>
								{/* 회원정보 수정 */}
								<span onClick={() => router.push(`/user/mypage-update`)} className='hover:text-blue-600 cursor-pointer'>
									회원정보 수정
								</span>
							</li>
							<li>
								{/* 비밀번호 변경 */}
								<span onClick={() => router.push(`/user/pwd-check`)} className='hover:text-blue-600 cursor-pointer'>
									비밀번호 변경
								</span>
							</li>
						</ul>
					</div>

					{/* 회원탈퇴하기 섹션 추가 */}
					<div>
						<h3 className='font-semibold text-red-600'>회원탈퇴</h3> {/* 빨간색 텍스트로 표시 */}
						<ul className='space-y-1 text-gray-600'>
							<li>
								{/* 회원탈퇴 */}
								<span onClick={() => router.push(`/user/delete-account`)} className='hover:text-red-600 cursor-pointer'>
									회원탈퇴하기
								</span>
							</li>
						</ul>
					</div>
				</nav>
			</aside>
		</div>
	);
}
