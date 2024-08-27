import Button from "@/components/button/Button";
import Input from "@/components/form/Input";
import SideMenu from "@/components/sidemenu/SideMenu";
import React from "react";

export default function page() {
	return (
		<div className='flex gap-2'>
			<SideMenu />
			<div className='bg-gray-100 flex-1'>
				<div className='bg-white p-6 rounded-lg shadow-lg mb-6'>
					<h2 className='text-lg font-semibold mb-4'>비밀번호 확인</h2>
					<p className='text-sm text-gray-600 mb-4'>회원님의 정보를 안전하게 보호하기 위해 비밀번호를 다시 한 번 입력해 주세요.</p>
					<div className='mb-4 '>
						<label for='username' className='block text-sm font-medium text-gray-700'>
							아이디
						</label>
						<Input type='text' id='username' name='username' value='jjh0299' className='mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100' disabled />
					</div>
					<div className='mb-6'>
						<label for='password' className='block text-sm font-medium text-gray-700'>
							비밀번호
						</label>
						<Input type='password' id='password' name='password' className='mt-1 block w-full p-2 border border-gray-300 rounded-md' />
					</div>
					<div className='flex justify-center'>
						<Button type='submit' text={"확인"} />
						<Button text={"취소"} />
					</div>
				</div>
			</div>
		</div>
	);
}
