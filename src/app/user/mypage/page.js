import SideMenu from "@/components/sidemenu/SideMenu";
import Image from "next/image";
import React from "react";

export default function page() {
	return (
		<div className='bg-gray-100'>
			<div className='flex gap-2'>
				<SideMenu />
				<main className='flex-1 rounded-lg bg-white p-8 shadow-md'>
					<div className='flex items-center gap-5 mb-8 '>
						<div className='flex items-center space-x-4'>
							<div className='w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center'>
								<svg className='w-10 h-10 text-gray-400' fill='currentColor' viewBox='0 0 24 24'>
									<path d='M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' />
								</svg>
							</div>
						</div>
						<div>
							<h1 className='text-2xl font-bold text-gray-900 mb-2'>안녕하세요 김혜윤입니다</h1>
							<div className='flex flex-col'>
								<span className='text-sm text-gray-500'>생년월일:</span>
								<span className='text-sm text-gray-500'>주소:</span>
								<span className='text-sm text-gray-500'>성별:</span>
								<span className='text-sm text-gray-500'>학력:</span>
							</div>
						</div>
					</div>

					<div className='grid grid-cols-5 gap-4 mb-8'>
						<div className='text-center'>
							<div className='text-gray-600 font-semibold'>지원완료</div>
							<div className='text-2xl font-bold text-gray-900'>0</div>
						</div>
						<div className='text-center'>
							<div className='text-gray-600 font-semibold'>이력서 열람</div>
							<div className='text-2xl font-bold text-gray-900'>0</div>
						</div>
						<div className='text-center'>
							<div className='text-gray-600 font-semibold'>입사 제안</div>
							<div className='text-2xl font-bold text-gray-900'>0</div>
						</div>
						<div className='text-center'>
							<div className='text-gray-600 font-semibold'>스크랩 공고</div>
							<div className='text-2xl font-bold text-gray-900'>1</div>
						</div>
						<div className='text-center'>
							<div className='text-gray-600 font-semibold'>관심기업공고</div>
							<div className='text-2xl font-bold text-gray-900'>6</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}
