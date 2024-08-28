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
					<div class='container mx-auto p-4'>
						<table class='min-w-full bg-white border border-gray-300'>
							<thead>
								<tr class='w-full bg-gray-800 text-white'>
									<th class='py-2 px-4'>#</th>
									<th class='py-2 px-4'>제목</th>
									<th class='py-2 px-4'>작성일</th>
									<th class='py-2 px-4'>내용</th>
								</tr>
							</thead>
							<tbody>
								<tr class='border-t text-center'>
									<td class='py-2 px-4'>1</td>
									<td class='py-2 px-4'>Mark</td>
									<td class='py-2 px-4'>Otto</td>
									<td class='py-2 px-4'>@mdo</td>
								</tr>
								<tr class='border-t text-center'>
									<td class='py-2 px-4'>2</td>
									<td class='py-2 px-4'>Jacob</td>
									<td class='py-2 px-4'>Thornton</td>
									<td class='py-2 px-4'>@fat</td>
								</tr>
								<tr class='border-t text-center'>
									<td class='py-2 px-4'>3</td>
									<td class='py-2 px-4'>Larry</td>
									<td class='py-2 px-4'>the Bird</td>
									<td class='py-2 px-4'>@twitter</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}
