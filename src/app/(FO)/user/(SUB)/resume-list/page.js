"use client";
import { getToken } from "@/app/util/token/token";
import Button from "@/components/button/Button";
import IconButton from "@/components/button/IconButton";
import Pagination from "@/components/pagination/Pagination";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiTrash2, FiEdit2, FiStar } from "react-icons/fi"; // 별표 아이콘 추가

export default function Page() {
	const [login, setLogin] = useState(null); // 초기값을 null로 설정
	const [totalPages, setTotalPages] = useState("");
	const [curPage, setCurPage] = useState(0);
	const router = useRouter();
	const [resume, setResume] = useState([]);

	// login 값이 있을 때 API 호출
	useEffect(() => {
		getToken().then((res) => {
			setLogin(res.IDX); // login 값 설정
			console.log(res);
		});
	}, []);

	// login 값이 설정된 후에 데이터 가져오기
	useEffect(() => {
		if (login !== null) {
			getData(); // login 값이 설정된 후에만 데이터 호출
		}
	}, [login, curPage]); // login과 curPage가 변경될 때마다 호출

	// 데이터 가져오기
	function getData() {
		const API_URL = `/api/jobseeker/resumes/${login}?curPage=${curPage}`;
		axios.get(API_URL).then((res) => {
			setResume(res.data.content);
			setTotalPages(res.data.totalPages);
			console.log(res);
		});
	}

	// 이력서 삭제하기
	function remove(resumeId) {
		axios
			.delete(`/api/jobseeker/resume/${resumeId}`)
			.then((res) => {
				alert("삭제 완료");
				getData();
			})
			.catch((error) => {
				alert("대표 이력서는 삭제할 수 없습니다.");
			});
	}

	// 대표 이력서 설정하기
	function setDefault(resumeId) {
		axios.put(`/api/jobseeker/resume/default/${resumeId}?joIdx=${login}`).then((res) => {
			if (res.status === 200) {
				alert("대표 이력서가 설정되었습니다.");
				getData();
			}
		});
	}

	return (
		<div className='flex-1 ml-2'>
			<div className='bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto'>
				<div className='flex justify-between items-center mb-6'>
					<h1 className='text-3xl font-bold text-gray-800'>이력서 목록</h1>
				</div>

				<div className='grid grid-cols-12 gap-4 px-5 py-2 bg-gray-100 rounded-lg'>
					<p className='col-span-1 text-center font-bold text-gray-600'>#</p>
					<p className='col-span-5 text-center font-bold text-gray-600'>제목</p>
					<p className='col-span-3 text-center font-bold text-gray-600'>작성일</p>
					<p className='col-span-2 text-center font-bold text-gray-600'>대표 이력서</p>
					<p className='col-span-1 text-center font-bold text-gray-600'></p>
				</div>

				{resume.length > 0 ? (
					resume.map((resume, index) => (
						<div key={index} className={`grid grid-cols-12 gap-4 px-5 py-3 items-center border-b border-gray-200 ${resume.reDefault === 1 ? "bg-yellow-50" : "bg-white"}`}>
							<p className='col-span-1 text-center text-gray-800'>{index + 1}</p>
							<p className='col-span-5 text-center text-gray-800 font-medium'>{resume.reTitle}</p>
							<p className='col-span-3 text-center text-gray-800'>{resume.reWriteDate}</p>
							<p className='col-span-2 text-center'>
								{resume.reDefault === 1 ? (
									<FiStar className='text-yellow-500 mx-auto' size={20} /> // 대표 이력서일 때 별표 아이콘
								) : (
									<Button text='대표 설정' onClick={() => setDefault(resume.id)} className='mx-auto px-2 py-1 text-sm bg-blue-500 text-white rounded' /> // 대표 설정 버튼
								)}
							</p>
							<div className='col-span-1 flex justify-center gap-2'>
								<IconButton>
									<FiEdit2 onClick={() => router.push(`/user/resume-update/${resume.id}`)} className='text-blue-500' size={20} />
								</IconButton>
								<IconButton>
									<FiTrash2 onClick={() => remove(resume.id)} className='text-red-500' size={20} />
								</IconButton>
							</div>
						</div>
					))
				) : (
					<p className='text-center mt-6 text-gray-500'>이력서가 없습니다.</p>
				)}
				<Pagination totalPages={totalPages} currentPage={curPage} setLoadPage={setCurPage} />
			</div>
		</div>
	);
}
