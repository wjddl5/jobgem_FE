"use client";

import Button from "@/components/button/Button";
import Input from "@/components/form/Input";
import Select from "@/components/form/Select";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import { useRouter } from "next/navigation";
import InputPopup from "@/components/popup/InputPopup";
import Link from "next/link";
import { getToken } from "@/app/util/token/token";
export default function DetialPage(props) {
	const [curPage, setCurPage] = useState(0);
	const [applyment, setApplyment] = useState([]);
	const [totalPages, setTotalPages] = useState(1);
	const [totalElements, setTotalElements] = useState(0);
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [apRead, setApRead] = useState(1);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
	const [title, setTitle] = useState("");
	const [applymentCount, setApplymentCount] = useState(0);
	const [viewCount, setViewCount] = useState(0);
	const [unviewCount, setUnviewCount] = useState(0);
	const [expandedRow, setExpandedRow] = useState(null);
	const [isPopupOpen, setPopupOpen] = useState(false);
	const [selectRow, setSelectRow] = useState({});
	const [login, setLogin] = useState(null); // 초기값을 null로 설정
	const inputs = [
		{ label: '메시지', name: 'blContent', placeholder: '메시지를 입력하세요', type: 'textarea' },
	];

	useEffect(() => {
		getToken().then((res) => {
			setLogin(res?.IDX || null); // login 값 설정
			console.log(res);
		});
	}, []);

	useEffect(() => {
		if (login !== null) {
			getApplymentList();
			getDetail();
		}
	}, [login, curPage]);

	const router = useRouter();


    function getApplymentList(){
        axios.get(`/api/posts/${props.params.poIdx}/applyments?curPage=${curPage}`).then((res)=>{
			console.log(res);
			setApplyment(res.data?.content || []);
			setTotalPages(res.data?.totalPages || 1);
			setTotalElements(res.data?.totalElements || 0);
		});
	}
	useEffect(() => {
		getApplymentList();
	}, [curPage]);

	const handleDelete = () => {
		setShowDeleteConfirm(true);
	};

	const confirmDelete = () => {
		setShowDeleteConfirm(false);
		axios.delete(`/api/posts/${props.params.poIdx}`).then((res) => {
			console.log(res);
			if(res.status === 200){
				router.push('/company/posting');
			}
		});
	};


	function getDetail(){
		axios.get(`/api/posts/${props.params.poIdx}/detail`).then((res)=>{
			console.log("getDetail",res);
			setTitle(res.data?.title || "");
			setApplymentCount(res.data?.applyCount || 0);
			setViewCount(res.data?.viewCount || 0);
			setUnviewCount(res.data?.unviewCount || 0);
		});
	}

	function search(){
		console.log(startDate,endDate,apRead);
        axios.get(`/api/post/applyments/search`,{
			params:{
				poIdx: props.params.poIdx,
				curPage: curPage,
				startDate: startDate,
				endDate: endDate,
				apRead: apRead
			}
		}).then((res)=>{
			console.log(res);
            setApplyment(res.data?.content || []);
            setTotalPages(res.data?.totalPages || 1);
            setTotalElements(res.data?.totalElements || 0);
        })
	}
	function onChangeSearch(e) {
		if (e.target.value == "열람") {
			setApRead(1);
		} else if (e.target.value == "미열람") {
			setApRead(0);
		}
	}

	const handleaddBlock = (e, item) => {
		e.preventDefault();
		setPopupOpen(true);
		setSelectRow(item);
	}

	const handleSubmit = (formData) => {
		if(confirm("차단 추가하시겠습니까?")){
			axios.post('/api/company/block', null, {
				params: {
					coIdx: selectRow.post?.coIdx,
					joIdx: selectRow.joIdx,
					blContent: formData.blContent
				}
			}).then((res) => {
				if(res.status === 200)
					alert("차단 추가완료");
			})
		}
	}

	function readResume(id){
		axios.put(`/api/posts/${id}/read`)
			.then(response => {
				router.push(`/company/resume/${id}`)
			})
			.catch(error => {

			});
	}

	return (
		<div className='flex gap-4'>
			<InputPopup
				isOpen={isPopupOpen}
				onClose={() => setPopupOpen(false)}
				title="차단사유를 입력하세요"
				inputs={inputs} // 여러 개의 입력 필드 전달
				onSubmit={handleSubmit}
			/>
			<div className='flex-1 ml-4 p-6 '>
				<div className='flex justify-between max-w-7xl mx-auto mb-8'>
					<Link href={`/post/view/${props.params.poIdx}`}><h1 className='text-3xl font-bold text-gray-800 mb-4 flex items-center'>{title}</h1></Link>
					<div className='flex gap-4'>
						<button
							className='h-10 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all'
							onClick={() => router.push(`/company/posting/edit/${props.params.poIdx}`)}
						>
							수정
						</button>
						<button onClick={handleDelete} className='h-10 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all'>
							삭제
						</button>
					</div>
				</div>
				{/* 통계 섹션 */}
				<div className='grid grid-cols-3 gap-6 max-w-7xl mx-auto mb-8'>
					<div className='bg-white p-6 rounded-lg shadow-md text-center'>
						<p className='text-4xl font-bold text-blue-600'>{applymentCount}</p>
						<p className='text-lg text-gray-600 mt-2'>지원자</p>
					</div>
					<div className='bg-white p-6 rounded-lg shadow-md text-center'>
						<p className='text-4xl font-bold text-green-600'>{viewCount}</p>
						<p className='text-lg text-gray-600 mt-2'>열람</p>
					</div>
					<div className='bg-white p-6 rounded-lg shadow-md text-center'>
						<p className='text-4xl font-bold text-red-600'>{unviewCount}</p>
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
								<Input type='date' className='w-full p-2 rounded border' onChange={(e) => setStartDate(e.target.value)} />
								<Input type='date' className='w-full p-2 rounded border' onChange={(e) => setEndDate(e.target.value)} />
							</div>
						</div>
						<div className='col-span-2'>
							<label className='text-sm text-gray-500 block mb-2'>열람여부</label>
							<Select ar={["열람", "미열람"]} className='w-full p-2 rounded border' onChange={onChangeSearch} />
						</div>
					</div>
					<div className='mt-5 text-center'>
						<Button type='submit' text='검색' className='px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all' onClick={search} />
					</div>
				</div>

				{/* 지원 내역 테이블 */}
				<div className='bg-white shadow-md rounded-lg'>
					<table className='min-w-full divide-y divide-gray-200'>
						<thead className='bg-blue-400'>
							<tr>
								<th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>#</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>지원자</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>열람상태</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>지원날짜</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>이력서보기</th>
							</tr>
						</thead>
						<tbody className='bg-white divide-y divide-gray-200'>
							{/* 데이터가 있을 때 테이블을 렌더링 */}
							{applyment.length > 0 ? (
								applyment.map((item, index) => (
									<React.Fragment key={item?.id || index}>
										<tr className='hover:bg-gray-50 transition-all cursor-pointer' onClick={() => setExpandedRow(expandedRow === index ? null : index)}>
											<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{index + 1}</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>{item.jobseeker?.joName}</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
												<span className={item.apRead === 1 ? "text-green-600" : "text-red-600"}>{item.apRead === 1 ? "열람" : "미열람"}</span>
											</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>{item.apDate}</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
												<button className='text-blue-500 hover:text-blue-600' onClick={() => readResume(item.reIdx)}>
													| 이력서보기 |
												</button>
											</td>
										</tr>
										{expandedRow === index && (
											<tr>
												<td colSpan={5} className='px-6 py-4'>
													<div className='bg-gray-100 p-6 rounded-lg shadow-md'>
														<div className='flex justify-between items-center'>
															<div className='w-1/3 flex justify-center'>
																<img src={`/S3/${item.jobseeker?.joImgUrl}`} alt='프로필' className='w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg' />
															</div>
															<div className='flex flex-col w-2/3 space-y-2'>
																<p className='text-lg font-semibold text-gray-800'>이름: {item.jobseeker?.joName}</p>
																<p className='text-md text-gray-600'>학력: {item.jobseeker?.joEdu}</p>
																<p className='text-md text-gray-600'>나이: {item.jobseeker?.joBirth ? new Date().getFullYear() - new Date(item.jobseeker.joBirth).getFullYear() : 'N/A'}</p>
																<p className='text-md text-gray-600'>전화번호: {item.jobseeker?.joTel}</p>
																<p className='text-md text-gray-600'>성별: {item.jobseeker?.joGender === "M" ? "남자" : item.jobseeker?.joGender === "F" ? "여자" : "N/A"}</p>
															</div>
														</div>
														<div className='mt-4 pt-4 border-t border-gray-200'>
															{item.jobseeker?.skills && item.jobseeker.skills?.length > 0 ? (
																<p className='text-md text-gray-700'>
																	<span className='font-semibold'>보유스킬:</span> {item.jobseeker.skills.map((skill) => skill.skName).join(", ")}
																</p>
															) : (
																<p className='text-md text-gray-500 italic'>보유스킬 없음</p>
															)}
														</div>
														<div className='text-right'>
															<Button text={"차단"} onClick={(e) => handleaddBlock(e, item)}/>
														</div>
													</div>
												</td>
											</tr>
										)}
									</React.Fragment>
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
				<div className='flex justify-center mt-6 space-x-4'>
					<Button
						type='button'
						text='이전'
						onClick={() => setCurPage(Math.max(0, curPage - 5))}
						disabled={curPage < 5}
						className='px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all'
					/>
					{(() => {
						const pageButtons = [];
						const startPage = Math.floor(curPage / 5) * 5;
						const endPage = Math.min(startPage + 4, totalPages - 1);

						for (let i = startPage; i <= endPage; i++) {
							pageButtons.push(
								<Button
									key={i}
									type='button'
									text={i + 1}
									onClick={() => setCurPage(i)}
									className={`px-6 py-2 rounded-lg hover:bg-blue-600 transition-all ${curPage === i ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"}`}
								/>
							);
						}

						return pageButtons;
					})()}
					<Button
						type='button'
						text='다음'
						onClick={() => setCurPage(Math.min(totalPages - 1, Math.floor(curPage / 5) * 5 + 5))}
						disabled={Math.floor(curPage / 5) * 5 + 5 >= totalPages}
						className='px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all'
					/>
				</div>
				{/* 삭제 확인 팝업 */}
				{showDeleteConfirm && <DeleteConfirmPopup onConfirm={confirmDelete} onCancel={() => setShowDeleteConfirm(false)} />}
			</div>
		</div>
	);
}

function DeleteConfirmPopup({ onConfirm, onCancel }) {
	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
			<div className='bg-white p-6 rounded-lg shadow-xl'>
				<h2 className='text-xl font-bold mb-4'>정말 삭제하시겠습니까?</h2>
				<p className='mb-6'>이 작업은 되돌릴 수 없습니다.</p>
				<div className='flex justify-end space-x-4'>
					<button onClick={onCancel} className='px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400'>
						취소
					</button>
					<button onClick={onConfirm} className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'>
						삭제
					</button>
				</div>
			</div>
		</div>
	);
}
