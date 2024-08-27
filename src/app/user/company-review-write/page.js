import Button from "@/components/button/Button";
import Input from "@/components/form/Input";
import SideMenu from "@/components/sidemenu/SideMenu";
import React from "react";

export default function page() {
	return (
		<div className='flex gap-2'>
			<SideMenu />
			<div className='bg-gray-100 flex-1 ml-2 '>
				<div className='bg-white p-8  rounded-lg '>
					<h2 className='text-2xl font-bold text-center mb-6'>리뷰 작성하기</h2>

					<div className='mb-4'>
						<label for='title' className='block text-sm font-medium text-gray-700'>
							리뷰 제목
						</label>
						<Input
							type='text'
							id='title'
							placeholder='제목을 입력하세요'
							className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
						/>
					</div>

					<div className='mb-4'>
						<label for='content' className='block text-sm font-medium text-gray-700'>
							리뷰 내용
						</label>
						<textarea
							id='content'
							rows='4'
							placeholder='내용을 입력하세요'
							className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
						></textarea>
					</div>

					<div className='mb-6'>
						<label className='block text-sm font-medium text-gray-700'>별점 선택</label>
						<div className='flex items-center justify-center mt-2 space-x-1'>
							<svg className='w-8 h-8 text-gray-300 hover:text-yellow-500 cursor-pointer' fill='currentColor' viewBox='0 0 20 20'>
								<path d='M9.049 3.3a1 1 0 011.902 0l1.286 3.957a1 1 0 00.95.69h4.146a1 1 0 01.6 1.8l-3.358 2.584a1 1 0 00-.364 1.118l1.287 3.957a1 1 0 01-1.537 1.108L10 13.987l-3.359 2.585a1 1 0 01-1.537-1.108l1.287-3.957a1 1 0 00-.364-1.118L3.669 9.747a1 1 0 01.6-1.8h4.146a1 1 0 00.95-.69L9.049 3.3z' />
							</svg>
							<svg className='w-8 h-8 text-gray-300 hover:text-yellow-500 cursor-pointer' fill='currentColor' viewBox='0 0 20 20'>
								<path d='M9.049 3.3a1 1 0 011.902 0l1.286 3.957a1 1 0 00.95.69h4.146a1 1 0 01.6 1.8l-3.358 2.584a1 1 0 00-.364 1.118l1.287 3.957a1 1 0 01-1.537 1.108L10 13.987l-3.359 2.585a1 1 0 01-1.537-1.108l1.287-3.957a1 1 0 00-.364-1.118L3.669 9.747a1 1 0 01.6-1.8h4.146a1 1 0 00.95-.69L9.049 3.3z' />
							</svg>
							<svg className='w-8 h-8 text-gray-300 hover:text-yellow-500 cursor-pointer' fill='currentColor' viewBox='0 0 20 20'>
								<path d='M9.049 3.3a1 1 0 011.902 0l1.286 3.957a1 1 0 00.95.69h4.146a1 1 0 01.6 1.8l-3.358 2.584a1 1 0 00-.364 1.118l1.287 3.957a1 1 0 01-1.537 1.108L10 13.987l-3.359 2.585a1 1 0 01-1.537-1.108l1.287-3.957a1 1 0 00-.364-1.118L3.669 9.747a1 1 0 01.6-1.8h4.146a1 1 0 00.95-.69L9.049 3.3z' />
							</svg>
							<svg className='w-8 h-8 text-gray-300 hover:text-yellow-500 cursor-pointer' fill='currentColor' viewBox='0 0 20 20'>
								<path d='M9.049 3.3a1 1 0 011.902 0l1.286 3.957a1 1 0 00.95.69h4.146a1 1 0 01.6 1.8l-3.358 2.584a1 1 0 00-.364 1.118l1.287 3.957a1 1 0 01-1.537 1.108L10 13.987l-3.359 2.585a1 1 0 01-1.537-1.108l1.287-3.957a1 1 0 00-.364-1.118L3.669 9.747a1 1 0 01.6-1.8h4.146a1 1 0 00.95-.69L9.049 3.3z' />
							</svg>
							<svg className='w-8 h-8 text-gray-300 hover:text-yellow-500 cursor-pointer' fill='currentColor' viewBox='0 0 20 20'>
								<path d='M9.049 3.3a1 1 0 011.902 0l1.286 3.957a1 1 0 00.95.69h4.146a1 1 0 01.6 1.8l-3.358 2.584a1 1 0 00-.364 1.118l1.287 3.957a1 1 0 01-1.537 1.108L10 13.987l-3.359 2.585a1 1 0 01-1.537-1.108l1.287-3.957a1 1 0 00-.364-1.118L3.669 9.747a1 1 0 01.6-1.8h4.146a1 1 0 00.95-.69L9.049 3.3z' />
							</svg>
						</div>
					</div>

					<div className='flex justify-center'>
						<button className='w-full px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600'>리뷰 제출하기</button>
					</div>
				</div>
			</div>
		</div>
	);
}
