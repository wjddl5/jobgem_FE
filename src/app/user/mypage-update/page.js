import Button from "@/components/button/Button";
import Input from "@/components/form/Input";
import SideMenu from "@/components/sidemenu/SideMenu";
import Image from "next/image";
import React from "react";

export default function page() {
	return (
		<div className='bg-gray-100'>
			<div className='flex gap-2'>
				<SideMenu />
				<div className='flex-1 bg-white p-8 rounded-lg shadow-lg'>
					<section className='mb-8'>
						<h2 className='text-lg font-semibold text-gray-700 mb-4'>인적사항</h2>

						<div className='col-span-1 flex flex-col items-center mb-5'>
							<div className='relative'>
								<Image id='profilePreview' className='w-32 h-32 rounded-full border border-gray-300 object-cover' src='' alt='Profile Preview' />
								<Input id='profilePic' type='file' className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer' accept='image/*' onchange='previewImage(event)' />
							</div>
						</div>

						<div className='grid grid-cols-2 gap-4'>
							<div>
								<label className='block text-sm font-medium text-gray-700' for='name'>
									이름
								</label>
								<Input id='name' type='text' className='mt-1 block w-full border border-gray-300 rounded p-2' value='김혜윤' />
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-700' for='dob'>
									생년월일
								</label>
								<Input id='dob' type='date' className='mt-1 block w-full border border-gray-300 rounded p-2' value='1998-04-18' />
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-700' for='gender'>
									성별
								</label>
								<Input id='gender' type='text' className='mt-1 block w-full border border-gray-300 rounded p-2' value='select 박스로 두기' />
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-700' for='email'>
									이메일
								</label>
								<Input id='email' type='email' className='mt-1 block w-full border border-gray-300 rounded p-2' value='hh@naver.com' />
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-700' for='phone'>
									전화번호
								</label>
								<Input id='phone' type='text' className='mt-1 block w-full border border-gray-300 rounded p-2' value='010-1234-5678' />
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-700' for='address'>
									주소
								</label>
								<Input id='address' type='text' className='mt-1 block w-full border border-gray-300 rounded p-2' />
							</div>
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
