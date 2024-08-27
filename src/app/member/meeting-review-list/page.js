import Button from "@/components/button/Button";
import SideMenu from "@/components/sidemenu/SideMenu";
import React from "react";

export default function page() {
	return (
		<div className='flex gap-2'>
			<SideMenu />
			<div class='bg-gray-100 flex-1 ml-2'>
				<div class='bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto'>
					<div class='flex justify-between items-center'>
						<h1 class='text-2xl font-bold'>면접후기</h1>
						<hr class='my-4' />
					</div>

					<div class='flex justify-between items-center mb-6'>
						<div class='flex items-center'>
							<p class='mr-4 '>경력테이블 for문</p>
							<Button type='submit' text='수정하기' />
							<Button text='삭제하기' />
						</div>
					</div>

					<div class='flex justify-between items-center mb-6'>
						<div class='flex items-center'>
							<p class='mr-4'>타란유엑스디</p>
							<Button text='작성하기' />
						</div>
					</div>

					<div class='flex justify-center'>
						<button class='px-6 py-3 bg-blue-500 text-white rounded-lg'>근무한 회사 추가하기</button>
					</div>
				</div>
			</div>
		</div>
	);
}
