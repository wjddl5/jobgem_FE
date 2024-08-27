import Button from "@/components/button/Button";
import Input from "@/components/form/Input";
import Select from "@/components/form/Select";
import SideMenu from "@/components/sidemenu/SideMenu";
import React from "react";

export default function page() {
	return (
		<div className='flex gap-2'>
			<SideMenu />
			<div className='bg-gray-100 flex-1 ml-2'>
				<div className='max-w-7xl mx-auto'>
					<h1 className='text-2xl font-bold mb-4'>입사지원 현황</h1>
				</div>

				<div className='grid grid-cols-5 gap-4 max-w-7xl mx-auto'>
					<div className='text-center'>
						<p className='text-3xl font-bold'>0</p>
						<p className='text-gray-500'>지원완료</p>
					</div>
					<div className='text-center'>
						<p className='text-3xl font-bold'>0</p>
						<p className='text-gray-500'>열람</p>
					</div>
					<div className='text-center'>
						<p className='text-3xl font-bold'>0</p>
						<p className='text-gray-500'>미열람</p>
					</div>
					<div className='text-center'>
						<p className='text-3xl font-bold'>0</p>
						<p className='text-gray-500'>지원취소</p>
					</div>
					<div className='text-center'>
						<p className='text-3xl font-bold'>0</p>
						<p className='text-gray-500'>기타</p>
					</div>
				</div>

				<div className='bg-white p-6 mt-8 rounded-lg shadow-lg max-w-7xl mx-auto'>
					<div className='grid grid-cols-4 gap-4'>
						<div className='col-span-2'>
							<label className='text-sm text-gray-500 block'>날짜선택</label>
							<div className='flex space-x-2'>
								<Input type='date' />
								<Input type='date' />
							</div>
						</div>
						<div className='col-span-2'>
							<label className='text-sm text-gray-500 block'>진행여부</label>
							<Select ar={["a", "b", "c"]} />
						</div>
					</div>
					<div className='mt-5 text-center'>
						<Button type='submit' text='검색' />
					</div>
				</div>

				<div className='mt-8 max-w-7xl mx-auto bg-white shadow-lg rounded-lg'>
					<table className='min-w-full divide-y divide-gray-200'>
						<thead className='bg-gray-800 text-white'>
							<tr>
								<th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>#</th>
								<th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>First</th>
								<th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>Last</th>
								<th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>Handle</th>
							</tr>
						</thead>
						<tbody className='bg-white divide-y divide-gray-200'>
							<tr>
								<td className='px-6 py-4 whitespace-nowrap'>1</td>
								<td className='px-6 py-4 whitespace-nowrap'>Mark</td>
								<td className='px-6 py-4 whitespace-nowrap'>Otto</td>
								<td className='px-6 py-4 whitespace-nowrap'>@mdo</td>
							</tr>
							<tr>
								<td className='px-6 py-4 whitespace-nowrap'>2</td>
								<td className='px-6 py-4 whitespace-nowrap'>Jacob</td>
								<td className='px-6 py-4 whitespace-nowrap'>Thornton</td>
								<td className='px-6 py-4 whitespace-nowrap'>@fat</td>
							</tr>
							<tr>
								<td className='px-6 py-4 whitespace-nowrap'>3</td>
								<td className='px-6 py-4 whitespace-nowrap'>Larry</td>
								<td className='px-6 py-4 whitespace-nowrap'>the Bird</td>
								<td className='px-6 py-4 whitespace-nowrap'>@twitter</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
