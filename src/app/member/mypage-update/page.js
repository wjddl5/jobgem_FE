import Button from "@/components/button/Button";
import Input from "@/components/form/Input";
import Image from "next/image";
import React from "react";

export default function page() {
	return (
		<div>
			<div class='bg-gray-100 p-8'>
				<div class='max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg'>
					<section class='mb-8'>
						<h2 class='text-lg font-semibold text-gray-700 mb-4'>인적사항</h2>

						<div class='col-span-1 flex flex-col items-center mb-5'>
							<div class='relative'>
								<Image id='profilePreview' class='w-32 h-32 rounded-full border border-gray-300 object-cover' src='' alt='Profile Preview' />
								<Input id='profilePic' type='file' class='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer' accept='image/*' onchange='previewImage(event)' />
							</div>
						</div>

						<div class='grid grid-cols-2 gap-4'>
							<div>
								<label class='block text-sm font-medium text-gray-700' for='name'>
									이름
								</label>
								<Input id='name' type='text' class='mt-1 block w-full border border-gray-300 rounded p-2' value='김혜윤' />
							</div>
							<div>
								<label class='block text-sm font-medium text-gray-700' for='dob'>
									생년월일
								</label>
								<Input id='dob' type='date' class='mt-1 block w-full border border-gray-300 rounded p-2' value='1998-04-18' />
							</div>
							<div>
								<label class='block text-sm font-medium text-gray-700' for='gender'>
									성별
								</label>
								<Input id='gender' type='text' class='mt-1 block w-full border border-gray-300 rounded p-2' value='select 박스로 두기' />
							</div>
							<div>
								<label class='block text-sm font-medium text-gray-700' for='email'>
									이메일
								</label>
								<Input id='email' type='email' class='mt-1 block w-full border border-gray-300 rounded p-2' value='hh@naver.com' />
							</div>
							<div>
								<label class='block text-sm font-medium text-gray-700' for='phone'>
									전화번호
								</label>
								<Input id='phone' type='text' class='mt-1 block w-full border border-gray-300 rounded p-2' value='010-1234-5678' />
							</div>
							<div>
								<label class='block text-sm font-medium text-gray-700' for='address'>
									주소
								</label>
								<Input id='address' type='text' class='mt-1 block w-full border border-gray-300 rounded p-2' />
							</div>
						</div>
					</section>

					<div class='text-center'>
						<Button type='submit' text={"작성"} />
						<Button text={"취소"} />
					</div>
				</div>
			</div>
		</div>
	);
}
