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
	const [interview, setInterview] = useState([]);
	const API_URL = `/api/interviewList?id=${props.params.id}&page=${page}&size=5`;

	function getData() {
		axios.get(API_URL).then((res) => {
			setInterview(res.data.content); // 데이터를 상태에 저장
			console.log(res);
		});
	}

	function remove(interviewId) {
		axios.get(`/api/deleteInterview?id=${interviewId}`).then((res) => {
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

	// 문자열이 7글자 이상일 경우, 잘라서 표시하는 함수
	function shortenText(text, maxLength) {
		if (text.length > maxLength) {
			return text.slice(0, maxLength) + "...";
		}
		return text;
	}

	return (
		<div className='flex gap-2'>
			<SideMenu />
			<div className='bg-gray-100 flex-1 ml-2'>
				<div className='bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto'>
					<div className='flex justify-between items-center'>
						<h1 className='text-2xl font-bold'>면접후기</h1>
						<Button type='submit' text='작성하기' onClick={() => router.push(`/user/Interview-review-write/${props.params.id}`)} />
					</div>

					{/* 테이블 헤더 */}
					<div className='flex justify-between items-center mt-5 px-5 py-2 font-bold bg-gray-200'>
						<p className='flex-1 text-center'>회사명</p>
						<p className='flex-1 text-center'>내용</p>
						<p className='flex-1 text-center'>작성일</p>
						<div style={{ width: "81px" }}></div>
					</div>

					{interview.length > 0 ? (
						interview.map((interview, index) => (
							<div key={index} className='flex justify-between items-center mb-6 mt-5 px-5 py-1'>
								<p className='flex-1 text-center'>{interview.coName}</p>
								<p className='flex-1 text-center'>{shortenText(interview.inContent, 7)}</p> {/* 7글자 초과 시 ...으로 표시 */}
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
				</div>
			</div>
		</div>
	);
}
