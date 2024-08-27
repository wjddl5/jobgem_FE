import Button from "@/components/button/Button";
import Input from "@/components/form/Input";
import SideMenu from "@/components/sidemenu/SideMenu";
import React from "react";

export default function page() {
	return (
		<div className='flex gap-2'>
			<SideMenu />
			<div className='bg-white p-6 rounded-lg shadow-lg flex-1'>
				<h2 className='text-lg font-semibold mb-4'>비밀번호 변경</h2>
				<p className='text-sm text-gray-600 mb-4'>비밀번호는 8~16자 영문, 숫자, 특수문자를 사용할 수 있습니다.</p>
				<p className='text-sm text-red-600 mb-4'>비밀번호는 주기적(최소 6개월)으로 변경해 주시기 바랍니다.</p>
				<div className='mb-4'>
					<label for='current-password' className='block text-sm font-medium text-gray-700'>
						현재 비밀번호
					</label>
					<Input type='password' id='current-password' name='current-password' className='mt-1 block w-full p-2 border border-gray-300 rounded-md' />
				</div>
				<div className='mb-4'>
					<label for='new-password' className='block text-sm font-medium text-gray-700'>
						새로운 비밀번호
					</label>
					<Input type='password' id='new-password' name='new-password' className='mt-1 block w-full p-2 border border-gray-300 rounded-md' />
				</div>
				<div className='mb-6'>
					<label for='confirm-password' className='block text-sm font-medium text-gray-700'>
						새로운 비밀번호 확인
					</label>
					<Input type='password' id='confirm-password' name='confirm-password' className='mt-1 block w-full p-2 border border-gray-300 rounded-md' />
				</div>
				<div className='flex justify-center'>
					<Button type='submit' text='수정' />
					<Button text='취소' />
				</div>
			</div>
		</div>
	);
}
