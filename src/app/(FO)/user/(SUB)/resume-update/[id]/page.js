"use client";
import React, { useEffect, useState } from "react";
import Input from "@/components/form/Input";
import SideMenu from "@/components/sidemenu/SideMenu";
import { useRouter } from "next/navigation";
import axios from "axios";
import Button from "@/components/button/Button";

export default function Page(props) {
	const [login, setLogin] = useState("0");
	useEffect(() => {
		getToken().then((res) => {
			setLogin(res.IDX);
			console.log(res);
		});
	}, []);
	const router = useRouter();
	const [coIdx, setCoIdx] = useState("");
	const [reTitle, setReTitle] = useState("");
	const [reContent, setReContent] = useState("");
	const [reDefault, setReDefault] = useState("");
	const [reFileUrl, setReFileUrl] = useState(""); // 파일 URL 상태 추가
	const [selectedFile, setSelectedFile] = useState(null); // 새로 선택된 파일

	const API_FILE_UPLOAD = "/api/files/upload"; // 파일 업로드 API
	const resumeId = props.params.id;

	function getResume() {
		axios.get(`/api/jobseeker/resume/${resumeId}`).then((res) => {
			const data = res.data;
			setCoIdx(data.coIdx); // 회사 ID 설정
			setReTitle(data.reTitle); // 이력서 제목 설정
			setReContent(data.reContent); // 이력서 내용 설정
			setReDefault(data.reDefault);
			setReFileUrl(data.reFileUrl); // 파일 URL 설정
		});
	}

	useEffect(() => {
		getResume(); // 컴포넌트가 마운트될 때 한 번만 실행
	}, []);

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
			console.error("파일 업로드 실패:", error);
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
			let updatedFileUrl = reFileUrl; // 기존 파일 URL

			// 파일이 선택된 경우, 파일 업로드
			if (selectedFile) {
				const uploadedFileName = await uploadFile(selectedFile);
				if (uploadedFileName) {
					updatedFileUrl = uploadedFileName; // 업로드된 파일 이름으로 URL 업데이트
				}
			}

			// API_URL을 통한 정보 업데이트
			const res = await axios({
				url: "/api/jobseeker/resume",
				method: "put", // 업데이트를 위한 GET 요청
				params: {
					id: resumeId,
					joIdx: login,
					coIdx: coIdx,
					reTitle: reTitle,
					reContent: reContent,
					reDefault: reDefault,
					reFileUrl: updatedFileUrl, // 업로드된 파일 URL 전송
				},
			});

			if (res.status === 200) {
				alert("수정 완료");
				router.push(`/user/resume-list`);
			}
		} catch (error) {
			console.error("에러 발생:", error);
			alert("수정 중 문제가 발생했습니다.");
		}
	}

	return (
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

				{/* 포트폴리오 파일 업로드 및 미리보기 */}
				<section className='mb-8'>
					<h2 className='text-lg font-semibold text-gray-700 mb-4'>포트폴리오</h2>

					{/* 기존 파일이 있는 경우 */}
					{reFileUrl && (
						<div className='mb-4'>
							<p className='text-sm text-gray-600'>현재 파일:</p>
							<a
								href={`/s3/${reFileUrl}`} // S3 버킷의 파일 URL로 이동
								target='_blank'
								rel='noopener noreferrer'
								className='text-blue-500 hover:underline'
							>
								{reFileUrl}
							</a>
						</div>
					)}

					{/* 파일 업로드 입력란 */}
					<Input id='portfolio' type='file' onChange={handleFileChange} />
				</section>

				{/* 내용 입력란 */}
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
					<Button text='취소' onClick={() => router.push(`/user/resume-list`)} />
				</div>
			</div>
		</div>
	);
}
