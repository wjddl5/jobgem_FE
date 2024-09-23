'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";

export default function SideMenuCom() {
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();

	return (
		<div className='sticky top-24'>
			<aside className={`hidden md:block w-64 bg-white p-6 shadow-lg rounded-lg`}>
				<nav className='space-y-8'>
					<div>
						<h2 className='font-bold text-lg text-gray-900 mb-6'><Link href='/company'>기업회원 홈</Link></h2>
						<ul className='space-y-4'>
							<li>
								<span onClick={() => router.push(`/company`)} className='text-gray-700 hover:text-blue-600 cursor-pointer'>
									마이페이지
								</span>
							</li>
							<li>
								<span onClick={() => router.push(`/company/chat`)} className='text-gray-700 hover:text-blue-600 cursor-pointer'>
									채팅목록
								</span>
							</li>
						</ul>
					</div>

					<div>
						<h3 className='font-semibold text-gray-700 mb-2'>공고 조회</h3>
						<ul className='space-y-3 text-gray-600'>
							<li>
								<span onClick={() => router.push(`/company/posting/write`)} className='hover:text-blue-600 cursor-pointer'>
									공고 등록
								</span>
							</li>
							<li>
								<span onClick={() => router.push(`/company/posting`)} className='hover:text-blue-600 cursor-pointer'>
									공고 현황
								</span>
							</li>
						</ul>
					</div>

					<div>
						<h3 className='font-semibold text-gray-700 mb-2'>입사지원 관리</h3>
						<ul className='space-y-3 text-gray-600'>
							<li>
								<span className='hover:text-blue-600 cursor-pointer'>입사지원 현황</span>
							</li>
						</ul>
					</div>

					<div>
						<h3 className='font-semibold text-gray-700 mb-2'>인재추천/찜한인재</h3>
						<ul className='space-y-3 text-gray-600'>
							<li>
								<span onClick={() => router.push(`/company/talent/fit`)} className='hover:text-blue-600 cursor-pointer'>
									인재추천
								</span>
							</li>
							<li>
								<span onClick={() => router.push(`/company/talent/wish`)} className='hover:text-blue-600 cursor-pointer'>
									찜한인재
								</span>
							</li>
						</ul>
					</div>

					<div>
						<h3 className='font-semibold text-gray-700 mb-2'>후기 현황</h3>
						<ul className='space-y-3 text-gray-600'>
							<li>
								<span onClick={() => router.push(`/company/review`)} className='hover:text-blue-600 cursor-pointer'>
									기업후기
								</span>
							</li>
							<li>
								<span onClick={() => router.push(`/company/review/meeting`)} className='hover:text-blue-600 cursor-pointer'>
									면접후기
								</span>
							</li>
						</ul>
					</div>

					<div>
						<h3 className='font-semibold text-gray-700 mb-2'>차단목록 관리</h3>
						<ul className='space-y-3 text-gray-600'>
							<li>
								<span onClick={() => router.push(`/company/black`)} className='hover:text-blue-600 cursor-pointer'>
									차단 목록
								</span>
							</li>
						</ul>
					</div>

					<div>
						<h3 className='font-semibold text-gray-700'>커뮤니티</h3>
						<ul className='space-y-1 text-gray-600'>
							<li>
								<span onClick={() => router.push(`/company/bbs-notice-list`)} className='hover:text-blue-600 cursor-pointer'>
									공지사항
								</span>
							</li>
							<li>
								<span onClick={() => router.push(`/company/bbs-qna-list`)} className='hover:text-blue-600 cursor-pointer'>
									Q&A
								</span>
							</li>
						</ul>
					</div>

					<div>
						<h3 className='font-semibold text-red-600 mb-2'>회원탈퇴</h3>
						<ul className='space-y-3 text-gray-600'>
							<li>
								<span className='hover:text-red-600 cursor-pointer'>회원탈퇴하기</span>
							</li>
						</ul>
					</div>
				</nav>
			</aside>
		</div>
	);
}
