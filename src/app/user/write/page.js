import Button from "@/components/button/Button";
import Input from "@/components/form/Input";
import SideMenu from "@/components/sidemenu/SideMenu";
import React from "react";

export default function page() {
	return (
		<div className='flex gap-2'>
			<SideMenu />
			<div className='bg-gray-100 flex-1'>
				<div className='max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg'>
					<div className='mb-8'>
						<h2 className='text-lg font-semibold text-gray-700 mb-2'>제목</h2>
						<Input id='name' type='text' className='mt-1 block w-full border border-gray-300 rounded p-2' value='안녕하쇼 반갑쇼' />
					</div>

					<section className='mb-8'>
						<h2 className='text-lg font-semibold text-gray-700 mb-2'>스킬</h2>
						<div className='border border-gray-300 p-4 rounded-lg bg-gray-50'>
							<p className='text-gray-500 text-sm mb-2'>여기에 카테고리 for문 돌려서 체크박스 선택하게 하기</p>
						</div>
					</section>

					<section className='mb-8'>
						<h2 className='text-lg font-semibold text-gray-700 mb-2'>고용형태</h2>
						<div className='grid grid-cols-2 gap-4'>
							<div>
								<select id='employment' className='mt-1 block w-full border border-gray-300 rounded p-2'>
									<option>선택</option>
								</select>
							</div>
						</div>
					</section>

					<section>
						<div className='mb-8'>
							<h2 className='text-lg font-semibold text-gray-700 mb-4'>보유자격증</h2>
							<p className='text-gray-500 text-sm mb-2'>여기에 카테고리 for문 돌려서 체크박스 선택하게 하기</p>
						</div>
					</section>

					<section>
						<div className='mb-8'>
							<h2 className='text-lg font-semibold text-gray-700 mb-4'>포트폴리오</h2>
							<Input id='name' type='file' value='첨부파일' />
						</div>
					</section>

					<section>
						<div className='mb-8'>
							<h2 className='text-lg font-semibold text-gray-700 mb-4'>내용</h2>
							<Input id='name' type='text' className='mt-1 block w-full border border-gray-300 rounded p-2' value='여기에 에디터 넣기' />
						</div>
					</section>
					<div className='text-center'>
						<Button type='submit' text={"작성"} />
						<Button text={"취소"} />
					</div>
				</div>
			</div>
		</div>
	);
}
