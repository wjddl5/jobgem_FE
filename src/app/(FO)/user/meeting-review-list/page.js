import Button from "@/components/button/Button";
import SideMenu from "@/components/sidemenu/SideMenu";
import React from "react";

export default function page() {
	return (
		<div className='flex gap-2'>
			<SideMenu />
			<div className='bg-gray-100 flex-1 ml-2'>
				<div className='bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto'>
					<div className='flex justify-between items-center'>
						<h1 className='text-2xl font-bold'>면접후기</h1>
						<hr className='my-4' />
					</div>

					<div className='flex justify-between items-center mb-6'>
						<div className='flex items-center'>
							<p className='mr-4 '>경력테이블 for문</p>
							<Button type='submit' text='수정하기' />
							<Button text='삭제하기' />
						</div>
					</div>

					<div className='flex justify-between items-center mb-6'>
						<div className='flex items-center'>
							<p className='mr-4'>타란유엑스디</p>
							<Button text='작성하기' />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
