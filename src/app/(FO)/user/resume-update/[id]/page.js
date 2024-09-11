"use client";
import React, { useEffect, useState } from "react";
import Input from "@/components/form/Input";
import SideMenu from "@/components/sidemenu/SideMenu";
import { useRouter } from "next/navigation";
import axios from "axios";
import Button from "@/components/button/Button";

export default function Page(props) {
	const router = useRouter();

	const [coIdx, setCoIdx] = useState("");
	const [joIdx, setJoIdx] = useState("");
	const [reTitle, setReTitle] = useState("");
	const [reContent, setReContent] = useState("");

	const resumeId = props.params.id; // 리뷰 ID를 props에서 가져옴

	function getResume() {
		axios.get(`/api/getResume?id=${resumeId}`).then((res) => {
			const data = res.data;
			setCoIdx(data.coIdx); // 회사 ID 설정
			setJoIdx(data.joIdx); // 유저 ID 설정
			setReTitle(data.reTitle); // 리뷰 제목 설정
			setReContent(data.reContent); // 리뷰 내용 설정
		});
	}

	useEffect(() => {
		getResume(); // 컴포넌트가 마운트될 때 한 번만 실행
	}, []);

	function send() {
		axios({
			url: "/api/updateResume",
			method: "get", // 업데이트를 위한 PUT 요청
			params: {
				id: resumeId,
				joIdx: joIdx,
				coIdx: coIdx,
				reTitle: reTitle,
				reContent: reContent,
			},
		}).then((res) => {
			console.log(res);
			if (res.status === 200) {
				alert("수정 완료");
				router.push(`/user/resume-list/${joIdx}`);
			}
		});
	}

	return (
		<div className='flex'>
			<SideMenu />
			<div className='flex-1 ml-4 p-4 bg-gray-100'>
				<div className='bg-white p-8 rounded-lg shadow-md'>
					<h2 className='text-2xl font-bold mb-6'>이력서 작성</h2>

					{/* 제목 입력란 */}
					<div className='mb-4'>
						<label htmlFor='reTitle' className='block text-sm font-medium text-gray-700'>
							제목
						</label>
						<Input
							type='text'
							id='reTitle'
							name='reTitle'
							placeholder='제목을 입력하세요'
							className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
							value={reTitle}
							onChange={(e) => setReTitle(e.target.value)}
						/>
					</div>

					<section className='mb-8'>
						<h2 className='text-lg font-semibold text-gray-700 mb-4'>포트폴리오</h2>
						<Input id='portfolio' type='file' />
					</section>

					<div className='mb-4'>
						<label htmlFor='reContent' className='block text-sm font-medium text-gray-700'>
							내용
						</label>
						<textarea
							id='reContent'
							name='reContent'
							rows='6'
							placeholder='여기에 이력서 내용을 입력하세요.'
							className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
							value={reContent}
							onChange={(e) => setReContent(e.target.value)}
						></textarea>
					</div>

					{/* 버튼 */}
					<div className='flex justify-center gap-4'>
						<Button type='submit' text='작성' onClick={send} />
						<Button text='취소' onClick={() => router.push(`/user/resume-list/${joIdx}`)} />
					</div>
				</div>
			</div>
		</div>
	);
}
