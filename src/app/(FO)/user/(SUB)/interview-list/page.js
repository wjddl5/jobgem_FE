"use client";
import { getToken } from "@/app/util/token/token";
import Button from "@/components/button/Button";
import IconButton from "@/components/button/IconButton";
import Pagination from "@/components/pagination/Pagination";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiTrash2, FiEdit2 } from "react-icons/fi";

export default function Page() {
	const [login, setLogin] = useState(null); // 초기값을 null로 설정
	const [totalPages, setTotalPages] = useState("");
	const [curPage, setCurPage] = useState(0);
	const [interview, setInterview] = useState([]);
	const router = useRouter();

	// login 값이 있을 때 토큰을 가져오는 비동기 함수
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
		const API_URL = `/api/jobseeker/interviews/${login}?curPage=${curPage}`;
		axios.get(API_URL).then((res) => {
			setInterview(res.data.content);
			setTotalPages(res.data.totalPages);
			console.log(res);
		});
	}

	// 인터뷰 삭제하기
	function remove(interviewId) {
		axios.delete(`/api/jobseeker/interview/${interviewId}`).then((res) => {
			console.log(res);
			if (res.status === 200) {
				alert("삭제 완료");
				getData();
			}
		});
	}

	// 텍스트 길이를 줄이는 함수
	function shortenText(text, maxLength) {
		if (text.length > maxLength) {
			return text.slice(0, maxLength) + "...";
		}
		return text;
	}

	return (
		<div className='bg-gray-100 flex-1 ml-2'>
			<div className='bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto'>
				<div className='flex justify-between items-center'>
					<h1 className='text-2xl font-bold'>면접후기</h1>
					<Button type='submit' text='작성하기' onClick={() => router.push(`/user/interview-write`)} />
				</div>

				{/* 테이블 헤더 */}
				<div className='flex justify-between items-center mt-5 px-5 py-2 font-bold bg-gray-200'>
					<p className='flex-1 text-center'>회사명</p>
					<p className='flex-1 text-center'>내용</p>
					<p className='flex-1 text-center'>난이도</p>
					<p className='flex-1 text-center'>작성일</p>
					<div style={{ width: "81px" }}></div>
				</div>

				{interview.length > 0 ? (
					interview.map((interview, index) => (
						<div key={index} className='flex justify-between items-center mb-6 mt-5 px-5 py-1'>
							<p className='flex-1 text-center'>{interview.coName}</p>
							<p className='flex-1 text-center'>{shortenText(interview.inContent, 7)}</p> {/* 7글자 초과 시 ...으로 표시 */}
							<p className='flex-1 text-center'>{interview.inLevel}</p>
							<p className='flex-1 text-center'>{interview.inWriteDate}</p>
							<div className='flex gap-2 border-l border-l-gray-300 px-3'>
								<IconButton>
									<FiEdit2 onClick={() => router.push(`/user/interview-update/${interview.id}`)} />
								</IconButton>
								<IconButton>
									<FiTrash2 onClick={() => remove(interview.id)} />
								</IconButton>
							</div>
						</div>
					))
				) : (
					<p>면접후기가 없습니다.</p>
				)}
				<Pagination totalPages={totalPages} currentPage={curPage} setLoadPage={setCurPage} />
			</div>
		</div>
	);
}
