'use client';

import Button from "@/components/button/Button";
import Input from "@/components/form/Input";
import Select from "@/components/form/Select";
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function DetialPage(props) {
	const [curPage, setCurPage] = useState(0);
    const [applyment, setApplyment] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

	useEffect(()=>{
		getApplymentList();
	},[])
	
    function getApplymentList(){
        axios.get(`/api/post/apply?id=${props.params.poIdx}&curPage=${curPage}`).then((res)=>{
			console.log(res);
            setApplyment(res.data.content);
            setTotalPages(res.data.totalPages);
        })
    }

    useEffect(()=>{
        getApplymentList();
    },[curPage])

	const handleDelete = () => {
		setShowDeleteConfirm(true);
	};

	const confirmDelete = () => {
		// TODO: Implement actual delete logic here
		console.log("Deleting...");
		setShowDeleteConfirm(false);
	};

	return (
		<div className='flex gap-4'>
			<div className='flex-1 ml-4 p-6 bg-gray-50 rounded-lg shadow-lg'>
				<div className='flex justify-between max-w-7xl mx-auto mb-8'>
					<h1 className='text-3xl font-bold text-gray-800 mb-4 flex items-center'>입사지원 현황</h1>
					<div className='flex gap-4'>
						<button className='h-10 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all'>수정</button>
						<button onClick={handleDelete} className='h-10 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all'>삭제</button>
					</div>
				</div>
				{/* 통계 섹션 */}
				<div className='grid grid-cols-3 gap-6 max-w-7xl mx-auto mb-8'>
					<div className='bg-white p-6 rounded-lg shadow-md text-center'>
						<p className='text-4xl font-bold text-blue-600'>{applyment.length}</p>
						<p className='text-lg text-gray-600 mt-2'>지원완료</p>
					</div>
					<div className='bg-white p-6 rounded-lg shadow-md text-center'>
						<p className='text-4xl font-bold text-green-600'>{applyment.filter(item => item.apRead === 1).length}</p>
						<p className='text-lg text-gray-600 mt-2'>열람</p>
					</div>
					<div className='bg-white p-6 rounded-lg shadow-md text-center'>
						<p className='text-4xl font-bold text-red-600'>{applyment.filter(item => item.apRead === 0).length}</p>
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
								<Input type='date' className='w-full p-2 rounded border' />
								<Input type='date' className='w-full p-2 rounded border' />
							</div>
						</div>
						<div className='col-span-2'>
							<label className='text-sm text-gray-500 block mb-2'>합격여부</label>
							<Select ar={["합격", "불합격", "대기"]} className='w-full p-2 rounded border' />
						</div>
					</div>
					<div className='mt-5 text-center'>
						<Button type='submit' text='검색' className='px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all' />
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
								<th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>합격여부</th>
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
										<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
											{item.apPass === 1 ? <span className="text-blue-600">합격</span> : item.apPass === 0 ? 
											<span className="text-red-600">불합격</span> : <span className="text-yellow-600">대기</span>}
										</td>
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
				<div className='flex justify-center mt-6 space-x-4'>
					<Button
						type='button'
						text='이전'
						onClick={() => setCurPage(curPage - 1)}
						disabled={curPage === 0}
						className='px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all'
					/>
					<Button type='button' text='다음' onClick={() => setCurPage(curPage + 1)} disabled={curPage === totalPages} className='px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all' />
				</div>
			</div>
            {showDeleteConfirm && (
                <DeleteConfirmPopup
                    onConfirm={confirmDelete}
                    onCancel={() => setShowDeleteConfirm(false)}
                />
            )}
		</div>
	);
}

function DeleteConfirmPopup({ onConfirm, onCancel }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl">
                <h2 className="text-xl font-bold mb-4">정말 삭제하시겠습니까?</h2>
                <p className="mb-6">이 작업은 되돌릴 수 없습니다.</p>
                <div className="flex justify-end space-x-4">
                    <button onClick={onCancel} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
                        취소
                    </button>
                    <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                        삭제
                    </button>
                </div>
            </div>
        </div>
    );
}