"use client";
import Button from "@/components/button/Button";
import Input from "@/components/form/Input";
import SideMenu from "@/components/sidemenu/SideMenu";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios"; // axios 추가

export default function Page() {
	const joIdx = 1;
	const router = useRouter();

	const [reTitle, setReTitle] = useState("");
	const [reContent, setReContent] = useState("");

	function send() {
		axios({
			url: "/api/addResume",
			method: "get",
			params: {
				joIdx: joIdx,
				reTitle: reTitle,
				reContent: reContent,
			},
		}).then((res) => {
			console.log(res);
			if (res.status == 200) {
				alert("저장완료");
				router.push(`/user/resume-list/${joIdx}`);
			}
		});
	}

	return (
		<div className='flex gap-2'>
			<SideMenu />
			<div className='bg-gray-100 flex-1'>
				<div className='max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg'>
					<div className='max-w-7xl mx-auto'>
						<h1 className='text-2xl font-bold mb-4'>이력서 작성</h1>
					</div>

					<div className='mb-8'>
						<h2 className='text-lg font-semibold text-gray-700 mb-2'>제목</h2>
						<Input id='name' type='text' className='mt-1 block w-full border border-gray-300 rounded p-2' value={reTitle} onChange={(e) => setReTitle(e.target.value)} />
					</div>

					<section className='mb-8'>
						<h2 className='text-lg font-semibold text-gray-700 mb-4'>포트폴리오</h2>
						<Input id='portfolio' type='file' />
					</section>

					<section className='mb-8'>
						<h2 className='text-lg font-semibold text-gray-700 mb-4'>내용</h2>
						<textarea
							id='reContent'
							rows='10' // 텍스트 입력 필드를 더 넓고 높게 설정
							className='mt-1 block w-full border border-gray-300 rounded p-2'
							value={reContent}
							onChange={(e) => setReContent(e.target.value)}
							placeholder='여기에 이력서 내용을 입력하세요.'
						></textarea>
					</section>

					<div className='flex justify-center gap-4'>
						<Button type='submit' text='작성' onClick={send} />
						<Button text='취소' onClick={() => router.push(`/user/resume-list/${joIdx}`)} />
					</div>
				</div>
			</div>
		</div>
	);
}
