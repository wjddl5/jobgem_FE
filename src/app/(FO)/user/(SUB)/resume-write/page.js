"use client";
import Button from "@/components/button/Button";
import Input from "@/components/form/Input";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios"; // axios 추가
import { getToken } from "@/app/util/token/token";

export default function Page() {
	const [login, setLogin] = useState(null);
	useEffect(() => {
		getToken().then((res) => {
			setLogin(res.IDX);
			console.log(res);
		});
	}, []);
	const router = useRouter();

	const [reTitle, setReTitle] = useState("");
	const [reContent, setReContent] = useState("");
	const [selectedFile, setSelectedFile] = useState(null); // 파일이 선택되었는지 추적
	const API_FILE_UPLOAD = "/api/files/upload"; // 파일 업로드 API

	// 파일 업로드 함수
	async function uploadFile(file) {
		const formData = new FormData();
		formData.append("file", file);

		try {
			const res = await axios.post(API_FILE_UPLOAD, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			// 업로드된 파일의 URL에서 파일 이름만 추출
			const fileUrl = res.data;
			const fileName = fileUrl.substring(fileUrl.lastIndexOf("/") + 1); // '/' 마지막 위치부터 끝까지 잘라내기

			return fileName; // 추출한 파일 이름 반환
		} catch (error) {
			alert("파일 업로드 중 문제가 발생했습니다.");
			return null;
		}
	}

	// 파일 선택 핸들러
	function handleFileChange(e) {
		const file = e.target.files[0];
		if (file) {
			setSelectedFile(file); // 선택된 파일 상태 저장
		}
	}

	// 데이터 전송 함수
	async function send() {
		try {
			let uploadedFileName = "";

			if (selectedFile) {
				uploadedFileName = await uploadFile(selectedFile);
				if (!uploadedFileName) {
					return; // 파일 업로드에 실패하면 종료
				}
			}

			// API_URL을 통한 정보 업데이트
			const res = await axios.post("/api/jobseeker/resume", null, {
				params: {
					joIdx: login,
					reTitle: reTitle,
					reContent: reContent,
					reDefault: 0,
					reFileUrl: uploadedFileName, // 업로드된 파일 이름을 직접 전달
				},
			});

			// 성공 처리
			alert("작성 완료");
			router.push(`/user/resume-list`);
		} catch (error) {
			// 에러 처리
			alert("저장 중 문제가 발생했습니다.");
		}
	}

	return (
		<div className='flex-1 ml-2'>
			<div className='bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto'>
				<div className='flex justify-between items-center mb-6'>
					<h1 className='text-3xl font-bold text-gray-800'>이력서 목록</h1>
				</div>

				{/* 제목 입력 부분 */}
				<div className='mb-8'>
					<h2 className='text-xl font-bold text-gray-700 mb-2'>제목</h2>
					<div className='relative'>
						<Input
							id='name'
							type='text'
							className='mt-1 block w-full border border-gray-300 rounded-lg p-4 pr-10 focus:ring-2 focus:ring-blue-500 shadow-sm'
							value={reTitle}
							onChange={(e) => setReTitle(e.target.value)}
							placeholder='이력서 제목을 입력하세요.'
						/>
						<span className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400'>
							<i className='fas fa-pencil-alt'></i>
						</span>
					</div>
				</div>

				{/* 포트폴리오 파일 업로드 부분 */}
				<section className='mb-8'>
					<h2 className='text-xl font-bold text-gray-700 mb-4'>포트폴리오</h2>
					<label className='block'>
						<span className='sr-only'>파일 선택</span>
						<input
							type='file'
							className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all duration-300'
							name='reFileUrl'
							onChange={handleFileChange} // 파일 선택 시 핸들러
						/>
					</label>
				</section>

				{/* 내용 입력 부분 */}
				<section className='mb-8'>
					<h2 className='text-xl font-bold text-gray-700 mb-4'>내용</h2>
					<textarea
						id='reContent'
						rows='10'
						className='mt-1 block w-full border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-blue-500 shadow-sm'
						value={reContent}
						onChange={(e) => setReContent(e.target.value)}
						placeholder='여기에 이력서 내용을 입력하세요.'
					></textarea>
				</section>

				{/* 버튼 섹션 */}
				<div className='flex justify-center gap-6'>
					<Button type='submit' text='작성' onClick={send} className='px-6 py-3 text-lg font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300' />
					<Button
						text='취소'
						onClick={() => router.push(`/user/resume-list`)}
						className='px-6 py-3 text-lg font-semibold bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition duration-300'
					/>
				</div>
			</div>
		</div>
	);
}
