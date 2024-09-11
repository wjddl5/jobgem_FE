"use client";
import Button from "@/components/button/Button";
import Input from "@/components/form/Input";
import Select from "@/components/form/Select";
import Pagination from "@/components/pagination/Pagination";
import SideMenu from "@/components/sidemenu/SideMenu";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function page(props) {
	const [totalPages, setTotalPages] = useState("");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [curPage, setCurPage] = useState(0);
	const [applyment, setApplyment] = useState([]);
	const [applymentCount, setApplymentCount] = useState({
		지원완료: 0,
		열람: 0,
		미열람: 0,
	});
	const [apRead, setApRead] = useState(0); // 열람 여부 상태 추가

	const API_URL = `/api/applymentList?id=${props.params.id}&curPage=${curPage}`;
	const APPLYMENT_COUNT_URL = `/api/applymentCount?id=${props.params.id}`;
	const FILTER_API_URL = `/api/applymentSearch?joIdx=${props.params.id}`;

	// 데이터 가져오기
	function getData() {
		axios.get(API_URL).then((res) => {
			setApplyment(res.data.content); // 데이터를 상태에 저장
			setTotalPages(res.data.totalPages);
			console.log(res);
		});
	}

	// applymentCount 가져오기
	function getApplymentCount() {
		axios.get(APPLYMENT_COUNT_URL).then((res) => {
			setApplymentCount(res.data); // applymentCount 데이터를 상태에 저장
			console.log(res.data);
		});
	}

	// 날짜 범위와 열람 여부로 검색된 데이터 가져오기
	function getFilteredData() {
		axios
			.get(FILTER_API_URL, {
				params: {
					startDate: startDate,
					endDate: endDate,
					apRead: apRead,
					curPage: curPage,
				},
			})
			.then((res) => {
				setApplyment(res.data.content);
				console.log(res.data);
			})
			.catch((err) => {
				console.error("Error fetching filtered data:", err);
			});
	}

	useEffect(() => {
		getData();
		getApplymentCount();
	}, [curPage]);

	return (
		<div className='flex gap-4'>
			<SideMenu />
			<div className='flex-1 ml-4 p-6 bg-gray-50 rounded-lg shadow-lg'>
				<div className='max-w-7xl mx-auto mb-8'>
					<h1 className='text-3xl font-bold text-gray-800 mb-4'>입사지원 현황</h1>
					<p className='text-lg text-gray-600'>여기서 당신의 지원 현황을 한눈에 확인할 수 있습니다.</p>
				</div>

				{/* 통계 섹션 */}
				<div className='grid grid-cols-3 gap-6 max-w-7xl mx-auto mb-8'>
					<div className='bg-white p-6 rounded-lg shadow-md text-center'>
						<p className='text-4xl font-bold text-blue-600'>{applymentCount.지원완료}</p>
						<p className='text-lg text-gray-600 mt-2'>지원완료</p>
					</div>
					<div className='bg-white p-6 rounded-lg shadow-md text-center'>
						<p className='text-4xl font-bold text-green-600'>{applymentCount.열람}</p>
						<p className='text-lg text-gray-600 mt-2'>열람</p>
					</div>
					<div className='bg-white p-6 rounded-lg shadow-md text-center'>
						<p className='text-4xl font-bold text-red-600'>{applymentCount.미열람}</p>
						<p className='text-lg text-gray-600 mt-2'>미열람</p>
					</div>
				</div>

				{/* 검색 필터 섹션 */}
				<div className='bg-white p-6 rounded-lg shadow-md mb-8'>
					<h2 className='text-xl font-bold text-gray-800 mb-4'>검색 필터</h2>
					<div className='grid grid-cols-4 gap-6'>
						<div className='col-span-2'>
							<label className='text-sm text-gray-500 block mb-2'>날짜선택</label>
							<div className='flex space-x-2'>
								<Input type='date' className='w-full p-2 rounded border' value={startDate} onChange={(e) => setStartDate(e.target.value)} />
								<Input type='date' className='w-full p-2 rounded border' value={endDate} onChange={(e) => setEndDate(e.target.value)} />
							</div>
						</div>
						<div className='col-span-2'>
							<label className='text-sm text-gray-500 block mb-2'>열람여부</label>
							<Select
								ar={["열람", "미열람"]}
								name='apRead'
								className='w-full p-2 rounded border'
								value={apRead == 1 ? "열람" : apRead == 0 ? "미열람" : ""}
								onChange={(e) => setApRead(e.target.value == "열람" ? 1 : e.target.value == "미열람" ? 0 : -1)} // 기본값 -1
							/>
						</div>
					</div>
					<div className='mt-5 text-center'>
						<Button type='submit' text='검색' onClick={getFilteredData} className='px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all' />
					</div>
				</div>

				{/* 지원 내역 테이블 */}
				<div className='bg-white shadow-md rounded-lg'>
					<table className='min-w-full divide-y divide-gray-200'>
						<thead className='bg-blue-400'>
							<tr>
								<th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>#</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>지원회사</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>열람상태</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>지원날짜</th>
							</tr>
						</thead>
						<tbody className='bg-white divide-y divide-gray-200'>
							{/* 데이터가 있을 때 테이블을 렌더링 */}
							{applyment.length > 0 ? (
								applyment.map((item, index) => (
									<tr key={index} className='hover:bg-gray-50 transition-all'>
										<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{index + 1}</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>{item.post.company.coName}</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
											<span className={item.apRead === 1 ? "text-green-600" : "text-red-600"}>{item.apRead === 1 ? "열람" : "미열람"}</span>
										</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>{item.apDate}</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan={5} className='px-6 py-4 text-center text-gray-500'>
										지원 기록이 없습니다.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>

				{/* 페이지 네이션 */}
				<Pagination totalPages={totalPages} currentPage={curPage} setLoadPage={setCurPage} />
			</div>
		</div>
	);
}
