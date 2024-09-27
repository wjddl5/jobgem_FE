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
	const [review, setReview] = useState([]);
	const router = useRouter();

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
		const API_URL = `/api/jobseeker/reviews/${login}?curPage=${curPage}`;
		axios.get(API_URL).then((res) => {
			setReview(res.data.content);
			setTotalPages(res.data.totalPages);
			console.log(res);
		});
	}

	// 리뷰 삭제하기
	function remove(reviewId) {
		axios.delete(`/api/jobseeker/review/${reviewId}`).then((res) => {
			console.log(res);
			if (res.status === 200) {
				alert("삭제 완료");
				getData();
			}
		});
	}

	return (
		<div className='bg-gray-100 flex-1 ml-2'>
			<div className='bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto'>
				<div className='flex justify-between items-center'>
					<h1 className='text-2xl font-bold'>회사후기</h1>
					<Button type='submit' text='작성하기' onClick={() => router.push(`/user/company-review-write`)} />
				</div>

				{/* 테이블 헤더 */}
				<div className='flex justify-between items-center mt-5 px-5 py-2 font-bold bg-gray-200'>
					<p className='flex-1 text-center'>회사명</p>
					<p className='flex-1 text-center'>제목</p>
					<p className='flex-1 text-center'>평점</p>
					<p className='flex-1 text-center'>작성일</p>
					<div style={{ width: "81px" }}></div>
				</div>

				{review.length > 0 ? (
					review.map((review, index) => (
						<div key={index} className='flex justify-between items-center mb-6 mt-5 px-5 py-1'>
							<p className='flex-1 text-center'>{review.coName}</p>
							<p className='flex-1 text-center'>{review.reTitle}</p>
							<p className='flex-1 text-center'>{review.reScore}</p>
							<p className='flex-1 text-center'>{review.reWriteDate}</p>
							<div className='flex gap-2 border-l border-l-gray-300 px-3'>
								<IconButton>
									<FiEdit2 onClick={() => router.push(`/user/company-review-update/${review.id}`)} />
								</IconButton>
								<IconButton>
									<FiTrash2 onClick={() => remove(review.id)} />
								</IconButton>
							</div>
						</div>
					))
				) : (
					<p>회사후기가 없습니다.</p>
				)}

				<Pagination totalPages={totalPages} currentPage={curPage} setLoadPage={setCurPage} />
			</div>
		</div>
	);
}
