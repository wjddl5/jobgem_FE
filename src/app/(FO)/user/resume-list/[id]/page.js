"use client";
import Button from "@/components/button/Button";
import IconButton from "@/components/button/IconButton";
import SideMenu from "@/components/sidemenu/SideMenu";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiTrash2, FiEdit2 } from "react-icons/fi";

export default function Page(props) {
	const router = useRouter();
	const [page, setPage] = useState(0);
	const [resume, setResume] = useState([]);
	const API_URL = `/api/resumeList?id=${props.params.id}&page=${page}&size=5`;

	function getData() {
		axios.get(API_URL).then((res) => {
			setResume(res.data.content); // 데이터를 상태에 저장
			console.log(res);
		});
	}

	function remove(resumeId) {
		axios.get(`/api/deleteResume?id=${resumeId}`).then((res) => {
			console.log(res);
			if (res.status === 200) {
				alert("삭제 완료");
				getData();
			}
		});
	}

	useEffect(() => {
		getData();
	}, [page]);

	return (
		<div className='flex gap-2'>
			<SideMenu />
			<div className='bg-gray-100 flex-1 ml-2'>
				<div className='bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto'>
					<div className='flex justify-between items-center mb-6'>
						<h1 className='text-2xl font-bold'>이력서 목록</h1>
					</div>

					<div className='grid grid-cols-4 gap-4 px-5 py-2 font-bold bg-gray-200 rounded-lg'>
						<p className='text-center'>#</p>
						<p className='text-center'>제목</p>
						<p className='text-center'>작성일</p>
						<p className='text-center'></p>
					</div>

					{resume.length > 0 ? (
						resume.map((resume, index) => (
							<div key={index} className='grid grid-cols-4 gap-4 px-5 py-3 border-b border-gray-200'>
								<p className='text-center'>{index + 1}</p>
								<p className='text-center'>{resume.reTitle}</p>
								<p className='text-center'>{resume.reWriteDate}</p>
								<div className='flex justify-center gap-2'>
									<IconButton>
										<FiEdit2 onClick={() => router.push(`/user/resume-update/${resume.id}`)} />
									</IconButton>
									<IconButton>
										<FiTrash2 onClick={() => remove(resume.id)} />
									</IconButton>
								</div>
							</div>
						))
					) : (
						<p className='text-center mt-6'>이력서가 없습니다.</p>
					)}
				</div>

				{/* 페이지 네이션 추가 가능 */}
				<div className='flex justify-center mt-6'>
					<Button type='button' text='이전' onClick={() => setPage(page - 1)} disabled={page === 0} />
					<Button type='button' text='다음' onClick={() => setPage(page + 1)} />
				</div>
			</div>
		</div>
	);
}
