import Button from "@/components/button/Button";
import Input from "@/components/form/Input";
import SideMenu from "@/components/sidemenu/SideMenu";
import Image from "next/image";
import React from "react";

export default function () {
	return (
		<div className='flex gap-2'>
			<SideMenu />
			<div className='bg-gray-100 flex-1 ml-2 '>
				<div className='bg-white p-8  rounded-lg '>
					<h2 className='text-2xl font-bold text-center mb-6'>입사제안</h2>
					<div className='bg-white rounded-lg shadow-lg divide-y divide-gray-200'>
						<div className='p-4 flex flex-1 justify-between'>
							<div className='flex gap-5'>
								<svg className='w-10 h-10 text-gray-400' fill='currentColor' viewBox='0 0 24 24'>
									<path d='M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' />
								</svg>
								<div>
									<div className='text-lg font-bold text-gray-800'>현대자동차아산공장</div>
									<div className='text-sm text-gray-600 mt-1'>자동차·조선·철강·항공</div>
								</div>
							</div>
							<div>
								<Button type='submit' text={"수락"} />
								<Button text={"거절"} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
